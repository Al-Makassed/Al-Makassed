using ErrorOr;
using Makassed.Contracts.User;
using Microsoft.AspNetCore.JsonPatch;

namespace Makassed.Api.Services.Users;

public interface IUserService
{
    Task<List<GetUserResponse>> GetAllUsersAsync();

    Task<ErrorOr<GetUserResponse>> GetUserByIdAsync(string id);

    Task<ErrorOr<GetUserResponse>> ApplyPatchAsync(string id, JsonPatchDocument<UpdateUserRequest> patchDocument);

    string? GetUserId();

    Task<string?> GetUserRoleAsync();

    Task<ErrorOr<string>> UploadUserAvatarAsync(IFormFile file);
}