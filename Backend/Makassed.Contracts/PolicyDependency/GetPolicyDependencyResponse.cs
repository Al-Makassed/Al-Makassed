using Makassed.Contracts.Enums;

namespace Makassed.Contracts.PolicyDependency;

public record  GetPolicyDependencyResponse
{
    public Guid Id { get; set; }
    
    public string Code { get; set; } = null!;
    
    public string Name { get; set; } = null!;
    
    public PolicyDependencyType Type { get; set; }
    
    public string? PdfUrl { get; set; }
    
    public int EstimatedTimeInMin { get; set; }
    
    public int PagesCount { get; set; }
    
    public DateTime CreatedAt { get; set; }

    public bool IsApproved { get; set; }

    public required string CreatorId { get; set; }
}
