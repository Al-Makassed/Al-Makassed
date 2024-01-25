namespace Makassed.Contracts.Search;

public record MonitoringToolSearchResponse : Searchable
{
    public override SearchEntityType SearchEntityType { get; } = SearchEntityType.MonitoringTool;

    public string Description { get; set; } = null!;

    public DateTime LastModified { get; set; }
    
    public bool IsApproved { get; set; }
}
