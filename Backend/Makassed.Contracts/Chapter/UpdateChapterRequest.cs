namespace Makassed.Contracts.Chapter;

public record UpdateChapterRequest
{
    public required string Name { get; set; }
}