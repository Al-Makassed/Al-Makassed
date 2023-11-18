using Makassed.Api.Services.Users;
using Makassed.Contracts.User;
using Microsoft.AspNetCore.Authorization;
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

    [ProducesResponseType(StatusCodes.Status200OK, Type=typeof(UploadUserAvatarResponse))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [HttpPost("upload-avatar")]
    [Authorize]
    public async Task<IActionResult> UploadAvatar([FromForm] UploadUserAvatarRequest request)
    {
        var userAvatarUrl = await _userService.UploadUserAvatarAsync(request.Image);
        
        return userAvatarUrl.Match(
                  avatarUrl => Ok(new UploadUserAvatarResponse(avatarUrl)),
                  Problem);
    }
}
