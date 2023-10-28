using Microsoft.AspNetCore.Identity;

namespace Makassed.Api.Models.Domain;

public class Department
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    // public ICollection<IdentityUser> Users { get; set; } = new List<IdentityUser>();

    public List<MonitoringTool> MonitoringTools { get; set; } = new();
}
