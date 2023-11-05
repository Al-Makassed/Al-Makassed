using Microsoft.AspNetCore.Identity;

namespace Makassed.Api.Models.Domain;

public class MakassedUser : IdentityUser
{
    public required string FullName { get; set; }

    public Guid DepartmentId { get; set; }

    public Department Department { get; set; } = null!;

    public List<Policy> Policies { get; set; } = new();

    public List<Dependency> PolicyDependencies { get; set; } = new();

    public ICollection<Submission> Submissions { get; set; } = new List<Submission>();

    public DateTime CreatedOn { get; set; }

    public string? ProfileUrl { get; set; }
}