using ErrorOr;
using Makassed.Api.Models.Domain;
using Makassed.Api.ServiceErrors;
using Makassed.Contracts.Authentication;
using Makassed.Contracts.General;
using Makassed.Contracts.User.Roles;
using Microsoft.AspNetCore.Identity;

namespace Makassed.Api.Services.Authentication;

public class AuthenticationService : IAuthenticationService
{
    private readonly UserManager<MakassedUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly ITokenService _tokenService;
    private readonly SignInManager<MakassedUser> _signInManager;

    public AuthenticationService(UserManager<MakassedUser> userManager, RoleManager<IdentityRole> roleManager, ITokenService tokenService, SignInManager<MakassedUser> signInManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _tokenService = tokenService;
        _signInManager = signInManager;
    }
    

    public async Task<ErrorOr<MakassedUser>> GetUserByEmail(string requestEmail)
    {
        // Attempt to find the user by email.
        var user = await _userManager.FindByEmailAsync(requestEmail);

        // If the user is not found, return a "User Not Found" error.
        return user is not null ? user : Errors.User.NotFound;
    }
    
    public async Task<ErrorOr<MakassedUser>> GetUserById(string id)
    {
        // Attempt to find the user by ID.
        var user = await _userManager.FindByIdAsync(id);

        // If the user is not found, return a "User Not Found" error.
        return user is not null ? user : Errors.User.NotFound;
    }


    public async Task<ErrorOr<SuccessResponse>> Register(RegisterRequest request)
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
        var user = new MakassedUser { 
            Id = request.UserId, 
            UserName = request.UserName,
            FullName = request.FullName,
            DepartmentId = request.DepartmentId,
            Email = request.Email,
            SecurityStamp = Guid.NewGuid().ToString()
        };

        // Attempt to create the user.
        var result = await _userManager.CreateAsync(user, request.Password);

        // If the user creation failed, return a "User Creation Failed" error.
        if (!result.Succeeded)
            return Errors.User.CreateFailed;

        // Check if the roles exist, if no role exists, add the "Staff" role to the user.
        var validRoles = new List<string>();

        if (!request.Roles.Any())
        {
            validRoles.Add("Staff");
        }
        else
        {
            foreach (var role in request.Roles)
            {
                if (await _roleManager.RoleExistsAsync(role))
                    validRoles.Add(role);
            }

            if (!validRoles.Any())
                validRoles.Add("Staff");
        }

        // Add the role/s to the user.
        var identityResult = await _userManager.AddToRolesAsync(user, validRoles);

        // If adding the role to the user failed, return an "Add To Role Failed" error.
        if (!identityResult.Succeeded)
            return Errors.User.Role.AddToRolesFailed;
        
        // Return a success message.
        return new SuccessResponse(Message: "User created successfully.");
    }

    public async Task<ErrorOr<LoginResponse>> LogUserIn(LoginRequest request)
    {
        // Attempt to find the user by user ID.
        var user = await _userManager.FindByIdAsync(request.UserId);

        // If the user is not found, return a "User Not Found" error.
        if (user is null)
            return Errors.User.WrongCredentials;

        // Attempt to sign the user in with the given password.
        var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

        if (!result.Succeeded)
        {
            return Errors.User.WrongCredentials;
        }

        // Get the roles associated with the user.
        var roles = await _userManager.GetRolesAsync(user);

        // Create a JWT token with roles for the authenticated user.
        var accessToken = _tokenService.CreateAccessToken(user, roles.ToList());

        return new LoginResponse
        {
            UserId = user.Id,
            UserName = user.UserName!,
            FullName = user.FullName,
            Email = user.Email!,
            Roles = roles.ToList(),
            Token = accessToken.Token,
            Expiration = accessToken.Expiration
        };
    }

    public async Task<string> GenerateForgotPasswordToken(MakassedUser user)
    {
        // Generate a password reset token for the user.
        var token = await _userManager.GeneratePasswordResetTokenAsync(user);

        var isLocal = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development";

        if (isLocal)
            return token;

        var websiteUrl = "https://maqasid.netlify.app/reset-password";

        var forgotPasswordUrl = $"{websiteUrl}?token={token}&email={user.Email}";

        return forgotPasswordUrl;
    }

    public async Task<ErrorOr<SuccessResponse>> ResetPassword(ForgottenPasswordResetRequest request)
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
        return new SuccessResponse( Message : "Password changed successfully." );
    }

    public async Task<ErrorOr<SuccessResponse>> UpdateUserRolesAsync(string userId, UpdateUserRolesRequest request)
    {
        // Attempt to find the user by ID.
        var user = await _userManager.FindByIdAsync(userId);

        // If the user is not found, return a "User Not Found" error.
        if (user is null)
            return Errors.User.NotFound;

        // Get the roles associated with the user.
        var oldUserRoles = await _userManager.GetRolesAsync(user);

        // Check if the roles are valid, if no valid role, keep the original roles.
        var validRoles = new List<string>();

        foreach (var role in request.Roles)
        {
            if (role != null && await _roleManager.RoleExistsAsync(role))
                validRoles.Add(role);
        }

        if (!validRoles.Any() && validRoles != null)
            return new SuccessResponse(Message: "User roles still the same.");

        // Remove the all roles from user.
        var removeUserFromRolesResult = await _userManager.RemoveFromRolesAsync(user, oldUserRoles);

        // If removing the user from all roles failed, return a "Remove From Roles Failed" error.
        if (!removeUserFromRolesResult.Succeeded)
            return Errors.User.Role.SomethingWentWrong;

        // Add the valid role/s to the user.
        var identityResult = await _userManager.AddToRolesAsync(user, validRoles);

        // If adding the role to the user failed, return an "Add To Role Failed" error.
        if (!identityResult.Succeeded)
            return Errors.User.Role.AddToRolesFailed;

        // Return a success message.
        return new SuccessResponse(Message: "User roles updated successfully.");    
    }
}