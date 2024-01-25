namespace Makassed.Contracts.User.Department;
public record GetDepartmentResponse
{
    public Guid Id { get; set; }

    public required string Name { get; set; }

    public required string HeadId { get; set; }

    public HeadDto Head { get; set; } = null!;
}