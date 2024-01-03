using Makassed.Contracts.Enums;

namespace Makassed.Contracts.Search;

public record DependencySearchResponse : Searchable
{
    public required string Code { get; set; }
    
    public override SearchEntityType SearchEntityType { get; } = SearchEntityType.Dependency;

    public PolicyDependencyType Type { get; set; }

    public bool IsApproved { get; set; }

    public Guid PolicyId { get; set; }
}
