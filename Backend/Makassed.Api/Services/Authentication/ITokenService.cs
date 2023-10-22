using Makassed.Contracts.Authentication;
using Microsoft.AspNetCore.Identity;

namespace Makassed.Api.Services.Authentication;

public interface ITokenService
{
    LoginResponse CreateAccessToken(IdentityUser user, List<string> toList);
}