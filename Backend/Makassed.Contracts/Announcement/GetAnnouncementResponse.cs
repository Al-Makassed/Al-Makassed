namespace Makassed.Contracts.Announcement;

public record GetAnnouncementResponse
{
    public Guid Id { get; set; }

    public required string Body { get; set; }

    public DateTime CreatedAt { get; set; }

    public required string CreatorId { get; set; }

    public required string CreatorName { get; set; }

    public required string CreatorFullName { get; set; }

    public string? CreatorAvatarUrl { get; set; }

    public bool IsPinned { get; set; }
}
