namespace Makassed.Contracts.Chapter;


public record CreateChapterRequest
    {
        public string Name { get; set; } = null!;
    }
