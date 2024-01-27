namespace Makassed.Api.Models.Domain;

public class Announcement
{
    public Guid Id { get; set; }

    public string Body { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public string UserId { get; set; } = null!;

    public bool IsPinned { get; set; }

    // Navigation properties
    public MakassedUser Creator { get; set; } = null!;
}
