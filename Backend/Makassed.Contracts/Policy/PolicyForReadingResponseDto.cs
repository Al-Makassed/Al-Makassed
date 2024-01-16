using Makassed.Contracts.Chapter;

namespace Makassed.Contracts.Policy;

public record PolicyForReadingResponseDto
{
    public Guid Id { get; set; }

    public required string Code { get; set; }

    public required string Name { get; set; }

    public string? PdfUrl { get; set; }

    public string? Summary { get; set; }

    public bool IsApproved { get; set; }

    public required ChapterForReadingResponseDto Chapter { get; set; }
}
