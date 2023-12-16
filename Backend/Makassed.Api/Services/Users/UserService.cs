using AutoMapper;
using ErrorOr;
using Makassed.Api.Constants;
using Makassed.Api.Models.Domain;
using Makassed.Api.Repositories.Interfaces;
using Makassed.Api.Services.Storage;
using Makassed.Api.Validators.Users;
using Makassed.Contracts.User;
using Makassed.Contracts.User.Department;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using static Makassed.Api.ServiceErrors.Errors.User;

namespace Makassed.Api.Services.Users;

public class UserService : IUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<MakassedUser> _userManager;

    private string? _cachedUserId; // Cache the userId to avoid redundant calls to HttpContext
    private string? _cachedUserRole;
    private readonly ILocalFileStorageService _localFileStorageService;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly IDepartmentRepository _departmentRepository;
    private readonly UpdateUserRequestValidator _updateUserRequestValidator;

    public UserService(
        IHttpContextAccessor httpContextAccessor,
        UserManager<MakassedUser> userManager,
        ILocalFileStorageService localFileStorageService,
        IUnitOfWork unitOfWork,
        IMapper mapper,
        IDepartmentRepository departmentRepository,
        UpdateUserRequestValidator updateUserRequestValidator)
    {
        _httpContextAccessor = httpContextAccessor;
        _userManager = userManager;
        _localFileStorageService = localFileStorageService;
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _departmentRepository = departmentRepository;
        _updateUserRequestValidator = updateUserRequestValidator;
    }

    /// <summary>
    /// Gets the user ID of the authenticated (logged in) user.
    /// </summary>
    /// <returns>The user ID if the user is authenticated; otherwise, returns null.</returns>
    public string? GetUserId()
    {
        if (_cachedUserId is not null)
            return _cachedUserId;

        _cachedUserId = _httpContextAccessor.HttpContext?.User.FindFirstValue(MakassedClaimTypes.Id);

        return _cachedUserId;
    }

    public async Task<string?> GetUserRoleAsync()
    {
        var userId = GetUserId();

        if (userId is null)
            return null;

        if (_cachedUserRole is null)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user is null)
                return null;

            var roles = await _userManager.GetRolesAsync(user);

            _cachedUserRole = roles.FirstOrDefault();
        }

        return _cachedUserRole;
    }

    public async Task<ErrorOr<string>> UploadUserAvatarAsync(IFormFile image)
    {
        var userId = GetUserId();

        if (userId is null)
            return NotFound;

        // Get the user by Id.
        var user = await _userManager.FindByIdAsync(userId);

        if (user is null)
            return NotFound;

        // Remove the old avatar from the Avatars folder.
        if (user.AvatarUrl is not null)
            _localFileStorageService.DeleteAvatar(user.AvatarUrl);

        // Upload the new avatar to the Avatars folder.
        var avatarUrl = await _localFileStorageService.UploadFileAndGetUrlAsync(image, "Avatars");

        // Update the user's avatarUrl in the database.
        user.AvatarUrl = avatarUrl;

        await _unitOfWork.SaveChangesAsync();

        return avatarUrl;
    }

    public async Task<List<GetUserResponse>> GetAllUsersAsync()
    {
        var users = await _userManager.Users.ToListAsync();

        var usersResponse = new List<GetUserResponse>();

        async void Action(MakassedUser user)
        {
            usersResponse.Add(await MapUserToGetUserResponse(user));
        }

        users.ForEach(Action);

        return usersResponse;
    }

    public async Task<ErrorOr<GetUserResponse>> GetUserByIdAsync(string userId)
    {
        var authenticatedUserId = GetUserId();
        var authenticatedUserRole = await GetUserRoleAsync();

        // If the authenticated user is not the same as the requested user and is not an admin, return an "Unauthorized" error.
        if (!authenticatedUserId!.Equals(userId) && !authenticatedUserRole!.Equals("Admin"))
            return Unauthorized;

        var user = await _userManager.FindByIdAsync(userId);

        if (user is null)
            return NotFound;

        return await MapUserToGetUserResponse(user);
    }

    public async Task<ErrorOr<GetUserResponse>> ApplyPatchAsync(string id, JsonPatchDocument<UpdateUserRequest> patchDocument)
    {
        var authenticatedUserId = GetUserId();

        // If the authenticated user is not the same as the requested user, return an "Unauthorized" error.
        if (!authenticatedUserId!.Equals(id))
            return Unauthorized;

        var existingUser = await _userManager.FindByIdAsync(id);

        if (existingUser is null)
            return NotFound;

        var userToPatch = _mapper.Map<UpdateUserRequest>(existingUser);

        // Apply the patch to the user.
        patchDocument.ApplyTo(userToPatch);

        // Validate the patched user and return the errors if any.
        var validationResult = await _updateUserRequestValidator.ValidateAsync(userToPatch);

        if (!validationResult.IsValid)
            return InvalidModel(validationResult.Errors);

        _mapper.Map(userToPatch, existingUser);

        var updateResult = await _userManager.UpdateAsync(existingUser);

        if (!updateResult.Succeeded)
            return SomethingWentWrong(updateResult.Errors);

        return await MapUserToGetUserResponse(existingUser);
    }

    private async Task<GetUserResponse> MapUserToGetUserResponse(MakassedUser user)
    {
        var roles = await _userManager.GetRolesAsync(user);
        var department = await _departmentRepository.GetDepartmentByIdAsync(user.DepartmentId);

        var response = _mapper.Map<GetUserResponse>(user);
        response.Roles = roles.ToList();
        response.Department = _mapper.Map<GetDepartmentResponse>(department);

        return response;
    }
}