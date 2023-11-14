using Makassed.Contracts.MonitoringTool.Field;

namespace Makassed.Contracts.MonitoringTool.FocalPointTasks.Submissions;

public record SubmitFocalPointTaskRequest
{
    public List<FieldAnswerRequest> Answers { get; set; } = new();
}