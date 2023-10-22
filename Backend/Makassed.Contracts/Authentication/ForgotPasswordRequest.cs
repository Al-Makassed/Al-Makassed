namespace Makassed.Contracts.Authentication;

public record ForgotPasswordRequest
{
    public string UserId { get; set; } = null!;
}