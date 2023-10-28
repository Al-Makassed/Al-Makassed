namespace Makassed.Contracts.User;
public record GetDepartmentResponse
{
    public Guid Id { get; set; }

    public required string Name { get; set; }
}
