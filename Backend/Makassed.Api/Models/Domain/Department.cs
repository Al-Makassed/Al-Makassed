namespace Makassed.Api.Models.Domain;

public class Department
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string? HeadId { get; set; }

    // Navigation Properties
    public MakassedUser? Head { get; set; }

    public ICollection<FocalPointTask> FocalPointTasks { get; set; } = new List<FocalPointTask>();

    public ICollection<MakassedUser> Users { get; set; } = new List<MakassedUser>();
}