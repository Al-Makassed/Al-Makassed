namespace Makassed.Contracts.MonitoringTool.Field;

public record SubmitMonitoringToolFieldRequest
{
    public Guid FieldId { get; set; }

    public required bool Answer { get; set; }
}