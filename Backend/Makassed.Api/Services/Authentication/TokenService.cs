using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Makassed.Api.Models.Domain;
using Makassed.Api.Models.DTO;
using Makassed.Contracts.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace Makassed.Api.Services.Authentication;

public class TokenService : ITokenService
{
    private readonly IConfiguration _configuration;

    public TokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    
    public AccessTokenDto CreateAccessToken(MakassedUser user, List<string> roles)
    {
        // Create claims list.
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.NameIdentifier, user.Id), // A unique identifier for the user.
            new Claim(ClaimTypes.Name, user.FullName), // The user's full name.
            new Claim(ClaimTypes.GivenName, user.UserName ?? String.Empty), // The user's given name, (e.g. first name or username).
            new Claim(ClaimTypes.Email, user.Email ?? String.Empty),
            new Claim(ClaimTypes.MobilePhone, user.PhoneNumber ?? String.Empty),
            new Claim("profileUrl", user.ProfileUrl ?? String.Empty)
        };

        // Add user roles to claims.
        roles.ForEach(role => claims.Add(new Claim(ClaimTypes.Role, role)));

        // Create token.
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
        );

        // Return token.
        return new AccessTokenDto
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            Expiration = token.ValidTo,
        };
    }
}