using System.ComponentModel.DataAnnotations.Schema;
using Makassed.Contracts.Enums;

namespace Makassed.Api.Models.Domain;

public class Dependency
{
    public Guid Id { get; set; }
    
    public string Code { get; set; } = null!;
    
    public string Name { get; set; } = null!;

    public string PdfUrl { get; set; } = null!;

    [NotMapped] public FormFile File { get; set; } = null!;

    public int EstimatedTimeInMin { get; set; }

    public int PagesCount { get; set; }

    public PolicyDependencyType Type { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public bool IsApproved { get; set; }

    public string CreatorId { get; set; } = null!;

    public Guid PolicyId { get; set; }

    // Navigation Properties
    public Policy Policy { get; set; } = null!;

    public List<MakassedUser> Users { get; set; } = new();

    public MakassedUser Creator { get; set; } = null!;
}