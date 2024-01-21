using Makassed.Contracts.Enums;
using Makassed.Contracts.Policy;

namespace Makassed.Contracts.PolicyDependency;

public record DependencyForReadingResponseDto
{
    public Guid Id { get; set; }

    public string Code { get; set; } = null!;

    public string Name { get; set; } = null!;

    public PolicyDependencyType Type { get; set; }

    public string? PdfUrl { get; set; }

    public bool IsApproved { get; set; }

    public required PolicyForReadingResponseDto Policy { get; set; }
}
