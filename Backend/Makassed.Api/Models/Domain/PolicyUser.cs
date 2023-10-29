using Makassed.Contracts.Enums;

namespace Makassed.Api.Models.Domain;

public class PolicyUser
{
    public string PolicyCode { get; set; } = null!;

    public string UserId { get; set; } = null!;

    public FileReadingState ReadingState { get; set; }
}
