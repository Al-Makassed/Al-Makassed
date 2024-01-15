namespace Makassed.Contracts.User.Department;

public record HeadDto
{
    public string? FullName { get; set; }

    public required string UserName { get; set; }

    public required string Email { get; set; }

    public string? AvatarUrl { get; set; }
}
