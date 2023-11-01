namespace Makassed.Api.Models.Domain;

public class MonitoringToolFieldsSubmissions
{
    public Guid MonitoringToolId { get; set; }

    public Guid FieldId { get; set; }

    public Guid SubmissionId { get; set; }

    public bool? Answer { get; set; }

    // Navigation properties
    public MonitoringToolFields MonitoringToolField { get; set; } = null!;

    public Submission Submission { get; set; } = null!;
}
