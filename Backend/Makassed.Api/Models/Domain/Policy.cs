using System.ComponentModel.DataAnnotations.Schema;

namespace Makassed.Api.Models.Domain;

public class Policy
{
    public Guid Id { get; set; }

    public string Code { get; set; } = null!;
        
    public string Name { get; set; } = null!;

    [NotMapped] public IFormFile MainFile { get; set; } = null!;

    public string? PdfUrl { get; set; }

    public string? Summary { get; set; }

    public int PageCount { get; set; }

    public int EstimatedTimeInMin { get; set; }
        
    public Guid ChapterId { get; set; }

        
    // Navigation Properties
    public Chapter Chapter { get; set; } = null!;

    public List<Dependency> Dependencies { get; set; } = new();

    public List<MakassedUser> Users { get; set; } = new();
}