using Microsoft.AspNetCore.Identity;

namespace Makassed.Api.Models.Domain;

public class MakassedUser : IdentityUser
{
    public Guid DepartmentId { get; set; }

    public List<Policy> Policies { get; set; } = new();

    public List<Dependency> PolicyDependencies { get; set; } = new();

    public Department Department { get; set; } = null!;
    
    public Department? HeadDepartment { get; set; }
}
