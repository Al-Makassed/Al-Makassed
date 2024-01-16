namespace Makassed.Contracts.Chapter;

public record ChapterForReadingResponseDto
{
    public Guid Id { get; set; }

    public required string Name { get; set; }

    public bool EnableState { get; set; }
}
