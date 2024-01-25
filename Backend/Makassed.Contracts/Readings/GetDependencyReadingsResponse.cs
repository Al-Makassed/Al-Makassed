using Makassed.Contracts.Enums;
using Makassed.Contracts.Policy;
using Makassed.Contracts.PolicyDependency;

namespace Makassed.Contracts.Readings;

public record GetDependencyReadingsResponse
{
    public required string UserId { get; set; }

    public Guid DependencyId { get; set; }

    public FileReadingState ReadingState { get; set; }

    public DateTime LastAccessed { get; set; }

    public required DependencyForReadingResponseDto Dependency { get; set; }
}
