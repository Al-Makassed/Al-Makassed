using ErrorOr;

namespace Makassed.Api.Services.Users;

public interface IUserService
{
    string? GetUserId();

    string? GetUserRole();

    Task<ErrorOr<string>> UploadUserAvatarAsync(IFormFile file);
}
