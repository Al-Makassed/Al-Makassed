using Makassed.Contracts.Enums;

namespace Makassed.Contracts.Request;

public record GetApprovalRequestResponse
{

    public required string Title { get; set; }

    public required DateTime CreatedAt { get; set; }

    public required string RequesterId { get; set; }

    public required RequestEntityType EntityType { get; set; }

    public required Guid EntityId { get; set; }

    public required object Info { get; set; }
}