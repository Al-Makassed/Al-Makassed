namespace Makassed.Contracts.Search;

public record ChapterSearchResponse : Searchable
{
    public override SearchEntityType SearchEntityType { get; } = SearchEntityType.Chapter;
    
    public required bool EnableState { get; set; }
}
