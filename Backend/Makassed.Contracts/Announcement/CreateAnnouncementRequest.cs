namespace Makassed.Contracts.Announcement;

public record CreateAnnouncementRequest
{
    public required string Body { get; set; }

    public bool IsPinned { get; set; }
}
