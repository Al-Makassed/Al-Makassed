using ErrorOr;
using Makassed.Api.Models.Domain;
using Makassed.Contracts.Authentication;
using Makassed.Contracts.General;
using Makassed.Contracts.User.Roles;

namespace Makassed.Api.Services.Authentication;

public interface IAuthenticationService
{
    Task<ErrorOr<LoginResponse>> LogUserIn(LoginRequest request);
    
    Task<string> GenerateForgotPasswordToken(MakassedUser user);
    
    Task<ErrorOr<SuccessResponse>> ResetForgottenPassword(ResetForgottenPasswordRequest request);
    
    Task<ErrorOr<MakassedUser>> GetUserById(string id);
    
    Task<ErrorOr<SuccessResponse>> Register(RegisterRequest request);

    Task<ErrorOr<SuccessResponse>> UpdateUserRolesAsync(string userId, UpdateUserRolesRequest request);
    
    Task<ErrorOr<SuccessResponse>> ResetPassword(ResetPasswordRequest request);
}