namespace Makassed.Api.Models.Domain;

public class MonitoringToolField
{
    public Guid FieldId { get; set; }

    public Guid MonitoringToolId { get; set; }

    public Guid SubmissionId { get; set; }

    public string Answer { get; set; } = null!;

    public Field Field { get; set; } = null!;

    public MonitoringTool MonitoringTool { get; set; } = null!;

    public Submission Submission { get; set; } = null!;
}
