namespace Makassed.Contracts.User.Department;
public record CreateDepartmentRequest
{
    public required string Name { get; init; }

    // Not going to accept HeadId, because we have to create the head first by adding users to the department, then we can update the department with the head id
}