namespace UserManagement.Service.Models.DTOs;

public class LoginModel
{
    public required string UserId { get; set; }
    public required string Password { get; set; }
}