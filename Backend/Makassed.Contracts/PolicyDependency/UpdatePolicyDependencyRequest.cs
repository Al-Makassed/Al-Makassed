using Microsoft.AspNetCore.Http;

namespace Makassed.Contracts.PolicyDependency;

public record UpdatePolicyDependencyRequest
{
    public string Name { get; set; } = null!;
    
    public required IFormFile File { get; set; }

    public required int EstimatedTime { get; set; }
}