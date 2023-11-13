namespace Makassed.Contracts.MonitoringTool;
public record GetAllMonitoringToolBaseResponse
{
    public Guid Id { get; set; }

    public required string Name { get; set; }

    public required string Description { get; set; }

    public DateTime LastModified { get; set; }
}
