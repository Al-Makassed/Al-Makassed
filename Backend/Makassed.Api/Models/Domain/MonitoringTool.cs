namespace Makassed.Api.Models.Domain;

public class MonitoringTool
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public DateTime LastModified { get; set; }
    
    // Navigation Properties
    public ICollection<FocalPointTask> FocalPointTasks { get; set; } = new List<FocalPointTask>();

    public List<Field> Fields { get; set; } = new();
}