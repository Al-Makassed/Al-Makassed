﻿using Makassed.Contracts.Enums;

namespace Makassed.Contracts.PolicyDependency;

public record  GetPolicyDependencyResponse
{
    public string Code { get; set; } = null!;
    
    public string Name { get; set; } = null!;
    
    public string? PdfUrl { get; set; }
    
    public int EstimatedTime { get; set; }
    
    public int PagesCount { get; set; }
    
    public string PolicyCode { get; set; } = null!;
    
    public PolicyDependencyType PolicyDependencyType { get; set; }
}
