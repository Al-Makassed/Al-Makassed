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
    private readonly ILocalFileStorageService _localFilleStorageService;
    private readonly IUserRepository _userRepository;

    public UserService(
        IHttpContextAccessor httpContextAccessor,
        UserManager<MakassedUser> userManager,
        ILocalFileStorageService localFileStorageService,
        IUserRepository userRepository)
    {
        _httpContextAccessor = httpContextAccessor;
        _userManager = userManager;
        _localFilleStorageService = localFileStorageService;
        _userRepository = userRepository;
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
            _localFilleStorageService.DeleteAvatar(user.AvatarUrl);

        // Upload the new avatar to the Avatars folder.
        var avatarUrl = await _localFilleStorageService.UploadFileAndGetUrlAsync(image, "Avatars");

        // Update the user's avatarUrl in the database.
        await _userRepository.SaveUserAvatarAsync(user, avatarUrl);

        return avatarUrl;
    }
}
