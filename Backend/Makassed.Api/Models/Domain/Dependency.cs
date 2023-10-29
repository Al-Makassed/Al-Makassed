using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Makassed.Contracts.Enums;

namespace Makassed.Api.Models.Domain;

public class Dependency
{
    [Key] public string Code { get; set; } = null!;
    
    public string Name { get; set; } = null!;

    public string PdfUrl { get; set; } = null!;

    [NotMapped] public FormFile File { get; set; } = null!;

    public int EstimatedTimeInMin { get; set; }

    public int PagesCount { get; set; }

    public PolicyDependencyType PolicyDependencyType { get; set; }

    public string PolicyCode { get; set; } = null!;

    // Navigation Properties
    public Policy Policy { get; set; } = null!;

    public List<MakassedUser> Users { get; set; } = new();
}
