using ErrorOr;

namespace Makassed.Api.Services.Users;

public interface IUserService
{
    string? GetUserId();

    Task<ErrorOr<string>> UploadUserAvatarAsync(IFormFile file);
}
