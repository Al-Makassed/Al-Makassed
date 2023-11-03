using ErrorOr;
using Makassed.Api.Models.Domain;
using Makassed.Contracts.Authentication;
using Makassed.Contracts.General;
using Microsoft.AspNetCore.Identity;

namespace Makassed.Api.Services.Authentication;

public interface IAuthenticationService
{
    Task<ErrorOr<LoginResponse>> LogUserIn(LoginRequest request);
    
    Task<string> GenerateForgotPasswordToken(MakassedUser user);
    
    Task<ErrorOr<SuccessResponse>> ResetPassword(ResetPasswordRequest request);

    Task<ErrorOr<MakassedUser>> GetUserByEmail(string requestEmail);

    Task<ErrorOr<MakassedUser>> GetUserById(string id);
    
    Task<ErrorOr<SuccessResponse>> Register(RegisterRequest request);
}