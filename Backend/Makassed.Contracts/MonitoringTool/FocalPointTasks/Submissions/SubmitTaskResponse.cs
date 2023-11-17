using Makassed.Contracts.MonitoringTool.Field;

namespace Makassed.Contracts.MonitoringTool.FocalPointTasks.Submissions;

public record SubmitTaskResponse
{
    public Guid Id { get; set; }

    public Guid FocalPointTaskId { get; set; }

    public string SubmitterId { get; set; } = null!;

    public int Number { get; set; }

    public DateTime SubmittedAt { get; set; }

    public List<FieldAnswerRequest> Answers { get; set; } = new();
}