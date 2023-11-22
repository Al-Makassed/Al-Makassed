using Makassed.Api.Services.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Makassed.Contracts.Authentication;
using Makassed.Email.Service.Services;
using Makassed.Contracts.General;
using Makassed.Contracts.User.Roles;
using System.IdentityModel.Tokens.Jwt;

namespace Makassed.Api.Controllers;

public class AuthenticationController : ApiController
{
    private readonly IAuthenticationService _authenticationService;
    private readonly IMakassedEmailService _emailService;

    public AuthenticationController(IAuthenticationService authenticationService, IMakassedEmailService emailService)
    {
        _authenticationService = authenticationService;
        _emailService = emailService;
    }


    [ProducesResponseType(typeof(SuccessResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var registerResult = await _authenticationService.Register(request);

        return registerResult.Match(
            Ok,
            Problem
        );
    }


    [ProducesResponseType(typeof(LoginResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var loginResult = await _authenticationService.LogUserIn(request);

        return loginResult.Match(
            Ok,
            Problem
        );
    }


    [ProducesResponseType(typeof(SuccessResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [AllowAnonymous]
    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
    {
        var userResult = await _authenticationService.GetUserById(request.UserId);

        if (userResult.IsError)
            return Problem(userResult.Errors);

        var forgetPasswordResult = await _authenticationService.GenerateForgotPasswordToken(userResult.Value);

        var isLocal = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development";

        var forgotPasswordUrl = isLocal
            ? Url.Action(
                nameof(ResetPassword),
                "Authentication",
                new { token = forgetPasswordResult, email = userResult.Value.Email }, Request.Scheme)
            : forgetPasswordResult;

        if (forgotPasswordUrl is null)
            return Problem();

        await _emailService.SendForgetPasswordEmail(userResult.Value.Email!, forgotPasswordUrl);

        return Ok(new SuccessResponse(Message: $"Password recovery link is sent to your Email: {userResult.Value.Email}"));
    }


    [ProducesResponseType(typeof(GetResetPasswordResponse), StatusCodes.Status200OK)]
    [AllowAnonymous]
    [HttpGet("reset-password")]
    public IActionResult ResetPassword(string token, string email)
    {
        var model = new GetResetPasswordResponse { Token = token, Email = email };

        return Ok(model);
    }


    [ProducesResponseType(typeof(SuccessResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [AllowAnonymous]
    [HttpPost("reset-forgotten-password")]
    public async Task<IActionResult> ResetForgottenPassword(ResetForgottenPasswordRequest request)
    {
        var resetPasswordResult = await _authenticationService.ResetForgottenPassword(request);

        return resetPasswordResult.Match(
            Ok,
            Problem
        );
    }

    // reset password
    [ProducesResponseType(typeof(SuccessResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [Authorize]
    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword(ResetPasswordRequest request)
    {
        var resetPasswordResult = await _authenticationService.ResetPassword(request);

        return resetPasswordResult.Match(
            Ok,
            Problem
        );
    }

    // update user roles
    [ProducesResponseType(typeof(SuccessResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize(Roles = "Admin, Sub-Admin")]
    [HttpPost("update-user-roles")]
    public async Task<IActionResult> UpdateUserRoles(string userId, UpdateUserRolesRequest request)
    {
        var updateUserRolesResult = await _authenticationService.UpdateUserRolesAsync(userId, request);

        return updateUserRolesResult.Match(
            Ok,
            Problem
        );
    }

    [Authorize]
    [ProducesResponseType(typeof(VerifyBearerTokenResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [HttpGet("verify-bearer-token")]
    public IActionResult VerifyBearerToken()
    {
        // If the token is invalid, the[Authorize] attribute will return a 401 Unauthorized response before calling this method.
        // If the token is valid, then the user is authorized.Hence, decode the token to get the payload.

        //Get the Authorization token from the request header.
        var authorizationToken = HttpContext.Request.Headers["Authorization"].ToString();

        // The token is in the format "Bearer {token}". We only need the token.
        authorizationToken = authorizationToken.Replace("Bearer ", string.Empty);

        if (string.IsNullOrEmpty(authorizationToken))
        {
            return Unauthorized();
        }

        // Decode the Authorization token using the JwtSecurityTokenHandler class.
        var tokenHandler = new JwtSecurityTokenHandler();
        var decodedToken = tokenHandler.ReadJwtToken(authorizationToken);

        // Get the token payload.
        var tokenPayload = decodedToken.Payload;

        return Ok(tokenPayload);
    }
}