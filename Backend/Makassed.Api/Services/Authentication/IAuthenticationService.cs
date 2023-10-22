using ErrorOr;
using Makassed.Contracts.Authentication;
using Microsoft.AspNetCore.Identity;

namespace Makassed.Api.Services.Authentication;

public interface IAuthenticationService
{
    Task<ErrorOr<LoginResponse>> LogUserIn(LoginRequest request);
    
    Task<string> GenerateForgotPasswordToken(IdentityUser user);
    
    Task<ErrorOr<string>> ResetPassword(ResetPasswordRequest request);

    Task<ErrorOr<IdentityUser>> GetUserByEmail(string requestEmail);
}