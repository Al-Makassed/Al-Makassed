namespace Makassed.Api.Models.Domain;

public class MonitoringToolFocalPoints
{
    public Guid MonitoringToolId { get; set; }

    public Guid FocalPointId { get; set; }

    public MonitoringTool MonitoringTool { get; set; } = null!;

    public FocalPoint FocalPoint { get; set; } = null!;

    public ICollection<Submission> Submissions { get; set; } = new List<Submission>();
}
