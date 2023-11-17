using Makassed.Contracts.Enums;

namespace Makassed.Api.Models.Domain;

public class DependencyUser
{
    public Guid DependencyId { get; set; }

    public string UserId { get; set; } = null!;

    public FileReadingState ReadingState { get; set; }
}