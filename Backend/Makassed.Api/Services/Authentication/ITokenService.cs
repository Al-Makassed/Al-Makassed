using Makassed.Api.Models.DTO;
using Makassed.Contracts.Authentication;
using Microsoft.AspNetCore.Identity;

namespace Makassed.Api.Services.Authentication;

public interface ITokenService
{
    AccessTokenDto CreateAccessToken(IdentityUser user, List<string> toList);
}