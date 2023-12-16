using Makassed.Api.Services.Users;
using Makassed.Contracts.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace Makassed.Api.Controllers;

[ProducesResponseType(StatusCodes.Status500InternalServerError)]
[ProducesResponseType(StatusCodes.Status401Unauthorized)]
public class UsersController : ApiController
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("upload-avatar")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UploadUserAvatarResponse))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [Authorize]
    public async Task<IActionResult> UploadAvatar([FromForm] UploadUserAvatarRequest request)
    {
        var userAvatarUrl = await _userService.UploadUserAvatarAsync(request.Image);

        return userAvatarUrl.Match(
            avatarUrl => Ok(new UploadUserAvatarResponse(avatarUrl)),
            Problem
        );
    }

    // get all users
    [HttpGet]
    [ProducesResponseType(typeof(List<GetUserResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAllUsers()
    {
        var usersResult = await _userService.GetAllUsersAsync();

        return Ok(usersResult);
    }

    // get user by id
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(GetUserResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize]
    public async Task<IActionResult> GetUser(string id)
    {
        var userResult = await _userService.GetUserByIdAsync(id);

        return userResult.Match(
            Ok,
            Problem
        );
    }

    // partial update user's info
    [HttpPatch("{id}")]
    [ProducesResponseType(typeof(GetUserResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize]
    public async Task<IActionResult> UpdateUserPassword(string id, JsonPatchDocument<UpdateUserRequest> patchDocument)
    {
        var userResult = await _userService.ApplyPatchAsync(id, patchDocument);

        return userResult.Match(
            Ok,
            Problem
        );
    }

    // update user's department
    [HttpPut("{id}")]
    [ProducesResponseType(typeof(GetUserResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateUserDepartment(string id, [FromBody] Guid departmentId)
    {
        var userResult = await _userService.UpdateUserDepartmentAsync(id, departmentId);

        return userResult.Match(
            Ok,
            Problem
        );
    }
}