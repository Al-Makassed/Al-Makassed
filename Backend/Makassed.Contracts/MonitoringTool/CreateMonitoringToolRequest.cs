namespace Makassed.Contracts.MonitoringTool;

public record CreateMonitoringToolRequest
{
    public required string Name { get; set; }
    
    public required string Description { get; set; }

    public List<Guid> FieldsIdes { get; set; } = new();

    public List<Guid> DepartmentsIdes { get; set; } = new();
}
