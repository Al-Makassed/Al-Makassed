namespace Makassed.Contracts.User;

public record UpdateUserDepartmentRequest
{
    public required Guid DepartmentId { get; set; }
}
