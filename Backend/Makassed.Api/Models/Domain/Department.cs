namespace Makassed.Api.Models.Domain;

public class Department
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public List<MonitoringTool> MonitoringTools { get; set; } = new();
}
