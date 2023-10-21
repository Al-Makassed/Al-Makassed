using ErrorOr;
using UserManagement.Service.Models.DTOs;

namespace Makassed.Api.Services.Authentication;

public interface IAuthenticationService
{
    Task<ErrorOr<LoginResponse>> LogUserIn(LoginRequest request);
}