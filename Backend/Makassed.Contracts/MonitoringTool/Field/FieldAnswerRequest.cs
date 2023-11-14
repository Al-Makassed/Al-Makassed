namespace Makassed.Contracts.MonitoringTool.Field;

public record FieldAnswerRequest
{
    public Guid FieldId { get; set; }

    public required bool Answer { get; set; }
}