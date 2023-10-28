namespace Makassed.Contracts.MonitoringTool.Field;

public record UpdateFieldRequest
{
    public required string Content { get; set; }
}