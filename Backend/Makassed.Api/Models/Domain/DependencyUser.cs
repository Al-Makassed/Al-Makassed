using Makassed.Contracts.Enums;

namespace Makassed.Api.Models.Domain;

public class DependencyUser
{
    public string DependencyCode { get; set; } = null!;

    public string UserId { get; set; } = null!;

    public FileReadingState ReadingState { get; set; }
}
