namespace Makassed.Contracts.Search;

public record PolicySearchResponse : Searchable
{
    public required string Code { get; set; }
    
    public override SearchEntityType SearchEntityType { get; } = SearchEntityType.Policy;

    public string? Summary { get; set; }

    public required bool IsApproved { get; set; }

    public required Guid ChapterId { get; set; }
}
