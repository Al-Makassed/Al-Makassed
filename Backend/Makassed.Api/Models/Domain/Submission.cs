namespace Makassed.Api.Models.Domain;

public class Submission
{
    public Guid Id { get; set; }

    public Guid MonitoringToolId { get; set; }

    public Guid FocalPointId { get; set; }

    public int Version { get; set; }

    // Navigation properties
    public MonitoringToolFocalPoints MonitoringToolFocalPoints { get; set; } = null!;

    public ICollection<MonitoringToolFields> MonitoringToolFields { get; set; } = new List<MonitoringToolFields>();
}
