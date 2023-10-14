namespace Makassed.Contracts.Chapter;


public record CreateChapterRequest
    {
        public required string Name { get; set; }
    }
