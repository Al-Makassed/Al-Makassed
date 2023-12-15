namespace Makassed.Contracts.Authentication;

public record LoginResponse
{
    public required string UserId { get; set; }

    public required string UserName { get; set; }

    public required string FullName { get; set; }

    public required string Email { get; set; }

    public required string DepartmentId { get; set; }

    public required List<string> Roles { get; set; } = new();

    public string? AvatarUrl { get; set; }

    public required string Token { get; set; } // JwtSecurityToken
    
    public DateTime Expiration { get; set; }

    public string? PhoneNumber { get; set; }
}