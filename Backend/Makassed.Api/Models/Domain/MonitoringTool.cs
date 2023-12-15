namespace Makassed.Api.Models.Domain;

public class MonitoringTool
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public DateTime LastModified { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public bool IsApproved { get; set; }

    public string CreatorId { get; set; } = null!;

    // Navigation Properties
    public List<FocalPointTask> FocalPointTasks { get; set; } = new();

    public List<Field> Fields { get; set; } = new();

    public MakassedUser Creator { get; set; } = null!;
}