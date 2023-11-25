using Makassed.Contracts.MonitoringTool.Field;
using Makassed.Contracts.User.Department;

namespace Makassed.Contracts.MonitoringTool;

public class GetMonitoringToolResponse
{
    public Guid Id { get; set; }

    public required string Name { get; set; }

    public required string Description { get; set; }

    public DateTime LastModified { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public bool IsApproved { get; set; }

    public string CreatorId { get; set; } = null!;

    public IEnumerable<GetFieldResponse> Fields { get; set; } = new List<GetFieldResponse>();

    public IEnumerable<GetDepartmentResponse> Departments { get; set; } = new List<GetDepartmentResponse>();
}