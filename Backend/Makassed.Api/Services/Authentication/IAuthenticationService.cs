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
    
    Task<ErrorOr<SuccessResponse>> ResetPassword(ForgottenPasswordResetRequest request);

    Task<ErrorOr<MakassedUser>> GetUserByEmail(string requestEmail);

    Task<ErrorOr<MakassedUser>> GetUserById(string id);
    
    Task<ErrorOr<SuccessResponse>> Register(RegisterRequest request);

    Task<ErrorOr<SuccessResponse>> UpdateUserRolesAsync(string userId, UpdateUserRolesRequest request);
}