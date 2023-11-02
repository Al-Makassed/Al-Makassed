namespace Makassed.Contracts.Authentication;

public record LoginResponse
{
    public required string UserId { get; set; }

    public required string UserName { get; set; }

    public required string Email { get; set; }

    public required string Role { get; set; }

    public string? ProfileUrl { get; set; }

    public required string Token { get; set; } // JwtSecurityToken
    
    public DateTime Expiration { get; set; }
}