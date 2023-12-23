namespace Makassed.Contracts.MonitoringTool;

public record UpdateMonitoringToolRequest
{
    public required string Name { get; set; }

    public required string Description { get; set; }
}