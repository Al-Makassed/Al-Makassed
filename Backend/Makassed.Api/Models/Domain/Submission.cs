namespace Makassed.Api.Models.Domain;

public class Submission
{
    public Guid Id { get; set; }

    public Guid MonitoringToolId { get; set; }

    public Guid DepartmentId { get; set; }

    public string SubmitterId { get; set; } = null!;

    public int Version { get; set; }

    // Navigation properties
    public MonitoringToolDepartments MonitoringToolDepartment { get; set; } = null!;

    public List<MonitoringToolFieldsSubmissions> MonitoringToolFieldsSubmissions { get; set; } = new();

    public MakassedUser Submitter { get; set; } = null!;
}