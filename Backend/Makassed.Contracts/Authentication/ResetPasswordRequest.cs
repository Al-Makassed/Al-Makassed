namespace Makassed.Contracts.Authentication;

public class ResetPasswordRequest
{
    public string Password { get; set; } = null!;
    
    public string ConfirmPassword { get; set; } = null!;
    
    public string Email { get; set; } = null!;
    
    public string Token { get; set; } = null!;
}