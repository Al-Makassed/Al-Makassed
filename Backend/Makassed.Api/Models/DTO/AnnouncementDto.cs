namespace Makassed.Api.Models.DTO;

public class AnnouncementDto
{
    public Guid Id { get; set; }

    public required string Body { get; set; }

    public DateTime CreatedAt { get; set; }

    public required string CreatorId { get; set; }

    public bool IsPinned { get; set; }
}
