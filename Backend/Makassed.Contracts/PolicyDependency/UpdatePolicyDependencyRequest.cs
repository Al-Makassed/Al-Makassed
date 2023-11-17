using Microsoft.AspNetCore.Http;

namespace Makassed.Contracts.PolicyDependency;

public record UpdatePolicyDependencyRequest
{
    public required string Code { get; set; }
    
    public string Name { get; set; } = null!;
    
    public required IFormFile File { get; set; }

    public required int EstimatedTimeInMin { get; set; }
}