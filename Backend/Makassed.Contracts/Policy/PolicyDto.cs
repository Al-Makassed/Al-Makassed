using Makassed.Contracts.Dependency;

namespace Makassed.Contracts.Policy;

public record PolicyDto
{
    public string Code { get; set; } = null!;
    public string Name { get; set; } = null!;
    public bool State { get; set; } = false;
    public string? PdfUrl { get; set; }
    public Guid ChapterId { get; set; }
    ICollection<DependencyDto> Dependencies { get; } = new List<DependencyDto>();
}