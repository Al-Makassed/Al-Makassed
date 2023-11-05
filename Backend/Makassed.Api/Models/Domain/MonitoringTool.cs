namespace Makassed.Api.Models.Domain;

public class MonitoringTool
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public DateTime LastModified { get; set; }

    public List<Department> Departments { get; set; } = new();

    public List<Field> Fields { get; set; } = new();
}