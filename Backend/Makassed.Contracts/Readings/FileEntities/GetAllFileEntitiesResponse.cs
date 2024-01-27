namespace Makassed.Contracts.Readings.FileEntities;

public record GetAllFileEntitiesResponse
{
    public required Guid Id { get; set; }

    public required string Name { get; set; }

    public required Guid ChapterId { get; set; }

    public required string ChapterName { get; set; }

    public required DateTime CreatedAt { get; set; }

    public required string PdfUrl { get; set; }

    public required FileEntityType Type { get; set; }
}
