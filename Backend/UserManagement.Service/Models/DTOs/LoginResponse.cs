namespace UserManagement.Service.Models.DTOs;

public record LoginResponse
{
    public required string Token { get; set; } // JwtSecurityToken
    public DateTime Expiration { get; set; }
}