namespace Makassed.Contracts.User.Department;
public record CreateDepartmentRequest
{
    public required string Name { get; init; }

    public required string HeadId { get; init; }
}
