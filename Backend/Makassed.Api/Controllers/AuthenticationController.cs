using Makassed.Api.Services.Authentication;
using Microsoft.AspNetCore.Mvc;
using UserManagement.Service.Models.DTOs;

namespace Makassed.Api.Controllers;

public class AuthenticationController : ApiController
{
    private readonly IAuthenticationService _authenticationService;

    public AuthenticationController(IAuthenticationService authenticationService)
    {
        _authenticationService = authenticationService;
    }

    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var loginResult = await _authenticationService.LogUserIn(request);

        return loginResult.Match(
            Ok,
            Problem
        );
    }
}