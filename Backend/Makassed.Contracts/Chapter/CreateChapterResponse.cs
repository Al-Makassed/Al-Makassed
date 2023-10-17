namespace Makassed.Contracts.Chapter;

public record CreateChapterResponse
{
    public Guid Id { get; set; }
        
    public required string Name { get; set; }
        
    public bool EnableState { get; set; }
}