namespace Makassed.Contracts.Authentication;

public record LoginResponse
{
    public required string Token { get; set; } // JwtSecurityToken
    
    public DateTime Expiration { get; set; }
}