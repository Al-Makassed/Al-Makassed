using Makassed.Contracts.PolicyDependency;
using Microsoft.AspNetCore.Http;

namespace Makassed.Contracts.Policy;

public record UpdatePolicyRequest
{
    public required string Name { get; set; }
    
    public required IFormFile MainFile { get; set; }

    public List<UpdatePolicyDependencyRequest> Dependencies { get; set; } = new();
}