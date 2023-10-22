using ErrorOr;
using Makassed.Api.ServiceErrors;
using Makassed.Contracts.Authentication;
using Microsoft.AspNetCore.Identity;

namespace Makassed.Api.Services.Authentication;

public class AuthenticationService : IAuthenticationService
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly ITokenService _tokenService;
    private readonly SignInManager<IdentityUser> _signInManager;

    public AuthenticationService(UserManager<IdentityUser> userManager, ITokenService tokenService, SignInManager<IdentityUser> signInManager)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _signInManager = signInManager;
    }

    public async Task<ErrorOr<IdentityUser>> GetUserByEmail(string requestEmail)
    {
        var user = await _userManager.FindByEmailAsync(requestEmail);

        return user is not null ? user : Errors.User.NotFound;
    }
    
    public async Task<ErrorOr<LoginResponse>> LogUserIn(LoginRequest request)
    {
        // Attempt to find the user by user ID.
        var user = await _userManager.FindByIdAsync(request.UserId);

        // If the user is not found, return a "User Not Found" error.
        if (user is null)
            return Errors.User.NotFound;

        // Attempt to sign the user in with the given password.
        var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

        if (!result.Succeeded)
        {
            return Errors.User.WrongPassword;
        }

        // Get the roles associated with the user.
        var roles = await _userManager.GetRolesAsync(user);

        // Create a JWT token with roles for the authenticated user.
        return _tokenService.CreateAccessToken(user, roles.ToList());
    }

    public async Task<string> GenerateForgotPasswordToken(IdentityUser user)
    {
        return await _userManager.GeneratePasswordResetTokenAsync(user);
    }

    public async Task<ErrorOr<string>> ResetPassword(ResetPasswordRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);

        if (user is null)
            return Errors.User.NotFound;

        var resetPasswordResult = await _userManager.ResetPasswordAsync(user, request.Token, request.Password);

        if (!resetPasswordResult.Succeeded)
            return Errors.User.ResetPasswordFailed;

        return "Password changed successfully.";
    }
}