using Makassed.Contracts.MonitoringTool.Field;

namespace Makassed.Contracts.MonitoringTool;

public record SubmitMonitoringToolRequest
{
    public required string SubmitterId { get; set; }

    public required Guid MonitoringToolId { get; set; }

    public required Guid DepartmentId { get; set; }

    public required List<FieldAnswerRequest> FieldsSubmissions { get; set; } = new();
}
