using ErrorOr;
using Makassed.Api.Models.Domain;
using Makassed.Contracts.Authentication;
using Microsoft.AspNetCore.Identity;

namespace Makassed.Api.Services.Authentication;

public interface IAuthenticationService
{
    Task<ErrorOr<LoginResponse>> LogUserIn(LoginRequest request);
    
    Task<string> GenerateForgotPasswordToken(MakassedUser user);
    
    Task<ErrorOr<string>> ResetPassword(ResetPasswordRequest request);

    Task<ErrorOr<MakassedUser>> GetUserByEmail(string requestEmail);

    Task<ErrorOr<MakassedUser>> GetUserById(string id);
    
    Task<ErrorOr<string>> Register(RegisterRequest request);
}