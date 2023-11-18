using Makassed.Api.Constants;
using System.Security.Claims;

namespace Makassed.Api.Services.Users;

public class UserService : IUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    private string? _cachedUserId; // Cache the userId to avoid redundant calls to HttpContext

    public UserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
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
}
