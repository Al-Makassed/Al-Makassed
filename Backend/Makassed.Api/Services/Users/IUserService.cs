using ErrorOr;

namespace Makassed.Api.Services.Users;

public interface IUserService
{
    string? GetUserId();

    Task<string?> GetUserRoleAsync();

    Task<ErrorOr<string>> UploadUserAvatarAsync(IFormFile file);
}