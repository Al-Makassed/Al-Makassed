namespace Makassed.Contracts.User;
public record UpdateUserRequest
{
    public string? FullName { get; set; }

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }
}
