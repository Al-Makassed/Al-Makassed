namespace Makassed.Api.Models.Domain;

public class MonitoringToolFields
{
    public Guid MonitoringToolId { get; set; }

    public Guid FieldId { get; set; }

    public string Answer { get; set; } = null!;

    public MonitoringTool MonitoringTool { get; set; } = null!;

    public Field Field { get; set; } = null!;

    public ICollection<Submission> Submission { get; set; } = new List<Submission>();
}
