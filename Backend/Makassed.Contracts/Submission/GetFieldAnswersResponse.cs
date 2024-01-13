using Makassed.Contracts.MonitoringTool.Field;

namespace Makassed.Contracts.Submission;

public record GetFieldAnswersResponse
{
    public Guid FieldId { get; set; }

    public Guid SubmissionId { get; set; }

    public bool Answer { get; set; }

    public GetFieldResponse Field { get; set; } = null!;
}
