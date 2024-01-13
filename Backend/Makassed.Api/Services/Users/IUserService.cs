using ErrorOr;
using Makassed.Contracts.General;
using Makassed.Contracts.User;
using Makassed.Contracts.User.Roles;
using Microsoft.AspNetCore.JsonPatch;

namespace Makassed.Api.Services.Users;

public interface IUserService
{
    Task<List<GetUserResponse>> GetAllUsersAsync();

    Task<ErrorOr<GetUserResponse>> GetUserByIdAsync(string id);

    Task<ErrorOr<GetUserResponse>> ApplyPatchAsync(JsonPatchDocument<UpdateUserRequest> patchDocument);

    string? GetUserId();

    Task<string?> GetUserRoleAsync();

    Task<ErrorOr<Guid>> GetUserDepartmentIdAsync();

    Task<ErrorOr<string>> UploadUserAvatarAsync(IFormFile file);

    Task<ErrorOr<GetUserResponse>> UpdateUserDepartmentAsync(string id, Guid departmentId);

    Task<ErrorOr<SuccessResponse>> UpdateUserRolesAsync(string userId, UpdateUserRolesRequest request);
}