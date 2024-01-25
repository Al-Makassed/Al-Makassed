using Makassed.Contracts.Enums;
using Makassed.Contracts.Policy;

namespace Makassed.Contracts.Readings;

public record GetPolicyReadingsResponse
{
    public required string UserId { get; set; }

    public Guid PolicyId { get; set; }

    public FileReadingState ReadingState { get; set; }

    public DateTime LastAccessed { get; set; }

    public required PolicyForReadingResponseDto Policy { get; set; }
}
