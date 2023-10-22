namespace Makassed.Contracts.Authentication;

public record LoginRequest
{
    public required string UserId { get; set; }
    public required string Password { get; set; }
}