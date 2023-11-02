using Microsoft.AspNetCore.Identity;

namespace Makassed.Api.Models.Domain;

public class MakassedUser : IdentityUser
{
    public Guid DepartmentId { get; set; }

    public Department Department { get; set; } = null!;

    public List<Policy> Policies { get; set; } = new();

    public List<Dependency> PolicyDependencies { get; set; } = new();

    public ICollection<Submission> Submissions { get; set; } = new List<Submission>();
}