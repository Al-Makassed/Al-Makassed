using Makassed.Contracts.MonitoringTool.Field;

namespace Makassed.Contracts.MonitoringTool.FocalPointTasks;

public record SubmitFocalPointTaskRequest
{
    public List<FieldAnswerRequest> Answers { get; set; } = new();
}