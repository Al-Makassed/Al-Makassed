namespace Makassed.Contracts.Authentication;

public record GetResetPasswordResponse
{
    public string Email { get; set; } = null!;
    
    public string Token { get; set; } = null!;
}