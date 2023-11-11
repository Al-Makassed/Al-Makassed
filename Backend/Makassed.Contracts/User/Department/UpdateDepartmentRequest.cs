namespace Makassed.Contracts.User.Department;
public record UpdateDepartmentRequest
{
    public required string Name { get; init; }

    public string? HeadId { get; init; }
}