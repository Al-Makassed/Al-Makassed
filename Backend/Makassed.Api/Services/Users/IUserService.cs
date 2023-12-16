using ErrorOr;
using Makassed.Contracts.User;

namespace Makassed.Api.Services.Users;

public interface IUserService
{
    Task<List<GetAllUsersBaseResponse>> GetAllUsersAsync();

    Task<ErrorOr<GetUserResponse>> GetUserByIdAsync(string id);

    string? GetUserId();

    Task<string?> GetUserRoleAsync();

    Task<ErrorOr<string>> UploadUserAvatarAsync(IFormFile file);
}