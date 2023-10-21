namespace UserManagement.Service.Models.DTOs;

public class LoginRequest
{
    public required string UserId { get; set; }
    public required string Password { get; set; }
}