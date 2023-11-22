using ErrorOr;
using Makassed.Api.Constants;
using System.Security.Claims;
using Makassed.Api.ServiceErrors;
using Makassed.Api.Models.Domain;
using Microsoft.AspNetCore.Identity;
using Makassed.Api.Repositories;
using Makassed.Api.Services.Storage;

namespace Makassed.Api.Services.Users;

public class UserService : IUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<MakassedUser> _userManager;

    private string? _cachedUserId; // Cache the userId to avoid redundant calls to HttpContext
    private string? _cachedUserRole;
    private readonly ILocalFileStorageService _localFileStorageService;
    private readonly IUnitOfWork _unitOfWork;

    public UserService(
        IHttpContextAccessor httpContextAccessor,
        UserManager<MakassedUser> userManager,
        ILocalFileStorageService localFileStorageService,
        IUnitOfWork unitOfWork)
    {
        _httpContextAccessor = httpContextAccessor;
        _userManager = userManager;
        _localFileStorageService = localFileStorageService;
        _unitOfWork = unitOfWork;
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
}