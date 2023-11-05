using Makassed.Api.Models.Domain;
using Makassed.Api.Models.DTO;

namespace Makassed.Api.Services.Authentication;

public interface ITokenService
{
    AccessTokenDto CreateAccessToken(MakassedUser user, List<string> toList);
}