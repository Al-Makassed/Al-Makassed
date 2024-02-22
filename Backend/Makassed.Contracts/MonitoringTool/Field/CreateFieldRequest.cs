namespace Makassed.Contracts.MonitoringTool.Field;

public record CreateFieldRequest
{
    public required string Content { get; set; }

    public required Guid CategoryId { get; set; }
}