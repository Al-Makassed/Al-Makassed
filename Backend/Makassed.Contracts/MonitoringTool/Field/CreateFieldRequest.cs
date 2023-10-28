namespace Makassed.Contracts.MonitoringTool.Field;

public record CreateFieldRequest
{
    public required string Content { get; set; }
}