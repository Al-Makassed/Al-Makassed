namespace Makassed.Api.Models.Domain;

public class Submission
{
    public Guid Id { get; set; }

    public Guid MonitoringToolId { get; set; }

    public MonitoringTool MonitoringTool { get; set; } = null!;

    public ICollection<MonitoringToolField> Fields { get; set; } = new List<MonitoringToolField>();
}
