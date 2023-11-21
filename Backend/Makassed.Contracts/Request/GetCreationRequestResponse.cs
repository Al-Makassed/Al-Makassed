using Makassed.Contracts.Enums;

namespace Makassed.Contracts.Request;

public record GetCreationRequestResponse
{

    public required string Title { get; set; }

    public required DateTime DateTime { get; set; }

    public required string RequesterId { get; set; }

    public required RequestEntityType EntityType { get; set; }

    public required string EntityId { get; set; }

    public required object Info { get; set; }
}
