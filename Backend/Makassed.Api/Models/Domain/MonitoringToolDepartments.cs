namespace Makassed.Api.Models.Domain;

public class MonitoringToolDepartments
{
    public Guid MonitoringToolId { get; set; }

    public Guid DepartmentId { get; set; }

    // Navigation properties
    public MonitoringTool MonitoringTool { get; set; } = null!;

    public Department Department { get; set; } = null!;

    public ICollection<Submission> Submissions { get; set; } = new List<Submission>();
}
