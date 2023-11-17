namespace Makassed.Api.Models.Domain;

public class FocalPointTask
{
    public Guid Id { get; set; }
    
    public Guid MonitoringToolId { get; set; }

    public Guid DepartmentId { get; set; }
    
    public int TotalSubmissions { get; set; }
    
    public bool IsFinished { get; set; }

    // Navigation properties
    public MonitoringTool MonitoringTool { get; set; } = null!;

    public Department Department { get; set; } = null!;

    public ICollection<Submission> Submissions { get; set; } = new List<Submission>();
}