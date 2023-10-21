using Microsoft.AspNetCore.Identity;
using UserManagement.Service.Models.DTOs;

namespace Makassed.Api.Services.Authentication;

public interface ITokenService
{
    LoginResponse CreateAccessToken(IdentityUser user, List<string> toList);
}