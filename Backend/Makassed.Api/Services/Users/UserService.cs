using AutoMapper;
using ErrorOr;
using Makassed.Api.Constants;
using Makassed.Api.Models.Domain;
using Makassed.Api.Repositories.Interfaces;
using Makassed.Api.ServiceErrors;
using Makassed.Api.Services.Storage;
using Makassed.Api.Validators.Users;
using Makassed.Contracts.General;
using Makassed.Contracts.User;
using Makassed.Contracts.User.Department;
using Makassed.Contracts.User.Roles;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

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
    private readonly RoleManager<IdentityRole> _roleManager;

    public UserService(
        IHttpContextAccessor httpContextAccessor,
        UserManager<MakassedUser> userManager,
        RoleManager<IdentityRole> roleManager,
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
        _roleManager = roleManager;
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

    // get authenticated user department id
    public async Task<ErrorOr<Guid>> GetUserDepartmentIdAsync()
    {
        var userId = GetUserId();

        if (userId is null)
            return Errors.User.NotFound;

        var user = await _userManager.FindByIdAsync(userId);

        if (user is null)
            return Errors.User.NotFound;

        return user.DepartmentId;
    }

    public async Task<ErrorOr<string>> UploadUserAvatarAsync(IFormFile image)
    {
        var userId = GetUserId();

        if (userId is null)
            return Errors.User.NotFound;

        // Get the user by Id.
        var user = await _userManager.FindByIdAsync(userId);

        if (user is null)
            return Errors.User.NotFound;

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
            return Errors.User.Unauthorized;

        var user = await _userManager.FindByIdAsync(userId);

        if (user is null)
            return Errors.User.NotFound;

        return await MapUserToGetUserResponse(user);
    }

    public async Task<ErrorOr<GetUserResponse>> ApplyPatchAsync(string id, JsonPatchDocument<UpdateUserRequest> patchDocument)
    {
        var authenticatedUserId = GetUserId();

        // If the authenticated user is not the same as the requested user, return an "Unauthorized" error.
        if (!authenticatedUserId!.Equals(id))
            return Errors.User.Unauthorized;

        var existingUser = await _userManager.FindByIdAsync(id);

        if (existingUser is null)
            return Errors.User.NotFound;

        var userToPatch = _mapper.Map<UpdateUserRequest>(existingUser);

        // Apply the patch to the user.
        patchDocument.ApplyTo(userToPatch);

        // Validate the patched user and return the errors if any.
        var validationResult = await _updateUserRequestValidator.ValidateAsync(userToPatch);

        if (!validationResult.IsValid)
            return Errors.User.InvalidModel(validationResult.Errors);

        _mapper.Map(userToPatch, existingUser);

        var updateResult = await _userManager.UpdateAsync(existingUser);

        if (!updateResult.Succeeded)
            return Errors.User.SomethingWentWrong(updateResult.Errors);

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

    public async Task<ErrorOr<GetUserResponse>> UpdateUserDepartmentAsync(string id, Guid departmentId)
    {
        var existingUser = await _userManager.FindByIdAsync(id);

        if (existingUser is null)
            return Errors.User.NotFound;

        var department = await _departmentRepository.GetDepartmentByIdAsync(departmentId);

        if (department is null)
            return Errors.Department.NotFound;

        existingUser.DepartmentId = departmentId;

        var updateResult = await _userManager.UpdateAsync(existingUser);

        if (!updateResult.Succeeded)
            return Errors.User.SomethingWentWrong(updateResult.Errors);

        return await MapUserToGetUserResponse(existingUser);
    }

    public async Task<ErrorOr<SuccessResponse>> UpdateUserRolesAsync(string userId, UpdateUserRolesRequest request)
    {
        // Attempt to find the user by ID and if the user is not found, return a "User Not Found" error.
        var user = await _userManager.FindByIdAsync(userId);

        if (user is null)
            return Errors.User.NotFound;

        // Get the roles associated with the user.
        var oldUserRoles = await _userManager.GetRolesAsync(user);

        // Check if the roles are valid, if no valid role, keep the original roles.
        var validRoles = new List<string>();

        foreach (var role in request.Roles)
        {
            if (await _roleManager.RoleExistsAsync(role))
                validRoles.Add(role);
        }

        if (!validRoles.Any())
            return Errors.User.Role.NoValidRoles;

        // Remove the all roles from user.
        var removeUserFromRolesResult = await _userManager.RemoveFromRolesAsync(user, oldUserRoles);

        // If removing the user from all roles failed, return a "Something Went Wrong" error with the errors provided by Identity.
        if (!removeUserFromRolesResult.Succeeded)
            return Errors.User.SomethingWentWrong(removeUserFromRolesResult.Errors);

        // Add the valid role/s to the user.
        var identityResult = await _userManager.AddToRolesAsync(user, validRoles);

        // If adding the role to the user failed, return an "Add To Role Failed" error.
        if (!identityResult.Succeeded)
            return Errors.User.SomethingWentWrong(removeUserFromRolesResult.Errors);

        // Return a success message.
        return new SuccessResponse(Message: "User roles updated successfully.");
    }
}