using Makassed.Contracts.Enums;

namespace Makassed.Api.Models.Domain;

public class PolicyUser
{
    public Guid PolicyId { get; set; }

    public string UserId { get; set; } = null!;

    public FileReadingState ReadingState { get; set; }

    public DateTime LastAccessed { get; set; }

    // Navigation Properties
    public Policy Policy { get; set; } = null!;

    public MakassedUser User { get; set; } = null!;
}
