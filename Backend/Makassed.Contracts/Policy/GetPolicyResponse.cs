﻿using Makassed.Contracts.PolicyDependency;

namespace Makassed.Contracts.Policy;

public record GetPolicyResponse
{
    public Guid Id { get; set; }

    public required string Code { get; set; }
        
    public required string Name { get; set; }
        
    public string? PdfUrl { get; set; }

    public string? Summary { get; set; }
    
    public int PageCount { get; set; }

    public int EstimatedTimeInMin { get; set; }
        
    public Guid ChapterId { get; set; }

    public DateTime CreatedAt { get; set; }

    public bool IsApproved { get; set; }

    public required string CreatorId { get; set; }
        
    public ICollection<GetPolicyDependencyResponse> Dependencies { get; set; } = new List<GetPolicyDependencyResponse>();
}