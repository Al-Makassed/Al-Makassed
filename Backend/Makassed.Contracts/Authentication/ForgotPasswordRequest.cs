namespace Makassed.Contracts.Authentication;

public record ForgotPasswordRequest
{
    public string Email { get; set; } = null!;
}