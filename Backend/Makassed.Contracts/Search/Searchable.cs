namespace Makassed.Contracts.Search;

public abstract record Searchable
{
    public required Guid Id { get; set; }

    public required string Name { get; set; }

    public DateTime CreatedAt { get; set; }
    
    public abstract SearchEntityType SearchEntityType { get; } 
}
