namespace Makassed.Contracts.User.Roles;
public record UpdateUserRolesRequest
{
    public required List<string> Roles { get; set; } = new();
}
