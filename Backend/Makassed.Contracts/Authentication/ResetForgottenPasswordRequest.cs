namespace Makassed.Contracts.Authentication;

public class ResetForgottenPasswordRequest
{
    public string Password { get; set; } = null!;
    
    public string Email { get; set; } = null!;
    
    public string Token { get; set; } = null!;
}