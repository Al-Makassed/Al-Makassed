using ErrorOr;
using Makassed.Api.ServiceErrors;
using Makassed.Contracts.Authentication;
using Microsoft.AspNetCore.Identity;

namespace Makassed.Api.Services.Authentication;

public class AuthenticationService : IAuthenticationService
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly ITokenService _tokenService;
    private readonly SignInManager<IdentityUser> _signInManager;

    public AuthenticationService(UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager, ITokenService tokenService, SignInManager<IdentityUser> signInManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _tokenService = tokenService;
        _signInManager = signInManager;
    }
    

    public async Task<ErrorOr<IdentityUser>> GetUserByEmail(string requestEmail)
    {
        // Attempt to find the user by email.
        var user = await _userManager.FindByEmailAsync(requestEmail);

        // If the user is not found, return a "User Not Found" error.
        return user is not null ? user : Errors.User.NotFound;
    }


    public async Task<ErrorOr<string>> Register(RegisterRequest request)
    {
        // Check if the user already exists.
        var existedUser = await _userManager.FindByIdAsync(request.UserId);

        // If the user already exists, return an "Already Exists" error.
        if (existedUser is not null)
            return Errors.User.AlreadyExists;

        // Check if the email is already used.
        var existedEmail = await _userManager.FindByEmailAsync(request.Email);

        // If the email is already used, return an "Email Already Exists" error.
        if (existedEmail is not null)
            return Errors.User.EmailAlreadyExists;

        // Create a new user (IdentityUser).
        var user = new IdentityUser { 
            Id = request.UserId, 
            UserName = request.UserName, 
            Email = request.Email,
            SecurityStamp = Guid.NewGuid().ToString()
        };

        // Attempt to create the user.
        var result = await _userManager.CreateAsync(user, request.Password);

        // If the user creation failed, return a "User Creation Failed" error.
        if (!result.Succeeded)
            return Errors.User.CreateFailed;

        // Check if the role exists, if not, return "Role Not Found" error.
        if (!await _roleManager.RoleExistsAsync(request.Role))
            return Errors.Role.NotFound;

        // Add the role to the user.
        var identityResult = await _userManager.AddToRoleAsync(user, request.Role);

        // If adding the role to the user failed, return an "Add To Role Failed" error.
        if (!identityResult.Succeeded)
            return Errors.User.AddToRoleFailed;
        
        // Return a success message.
        return "User created successfully.";
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
        // Generate a password reset token for the user.
        return await _userManager.GeneratePasswordResetTokenAsync(user);
    }

    public async Task<ErrorOr<string>> ResetPassword(ResetPasswordRequest request)
    {
        // Attempt to find the user by email.
        var user = await _userManager.FindByEmailAsync(request.Email);

        // If the user is not found, return a "User Not Found" error.
        if (user is null)
            return Errors.User.NotFound;

        // Attempt to reset the user's password.
        var resetPasswordResult = await _userManager.ResetPasswordAsync(user, request.Token, request.Password);

        // If the password reset failed, return a "Reset Password Failed" error.
        if (!resetPasswordResult.Succeeded)
            return Errors.User.ResetPasswordFailed;

        // Return a success message.
        return "Password changed successfully.";
    }
}