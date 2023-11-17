using Makassed.Contracts.Enums;

namespace Makassed.Api.Models.Domain;

public class PolicyUser
{
    public Guid PolicyId { get; set; }

    public string UserId { get; set; } = null!;

    public FileReadingState ReadingState { get; set; }
}
