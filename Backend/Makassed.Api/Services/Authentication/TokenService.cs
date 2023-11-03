using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
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
    
    public LoginResponse CreateAccessToken(IdentityUser user, List<string> roles)
    {
        // Create claims list.
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
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

        // Return response.
        return new LoginResponse
        {
            UserId = user.Id,
            UserName = user.UserName!,
            Email = user.Email!,
            Role = roles,
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            Expiration = token.ValidTo
        };
    }
}