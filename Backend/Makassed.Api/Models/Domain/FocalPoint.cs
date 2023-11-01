namespace Makassed.Api.Models.Domain;

public class FocalPoint
{
    public Guid Id { get; set; }

    public Guid DepartmentId { get; set; }

    public string DepartmentHeadId { get; set; } = null!;

    public Department Department { get; set; } = null!;

    public List<MonitoringTool> MonitoringTools { get; set; } = new();
}
