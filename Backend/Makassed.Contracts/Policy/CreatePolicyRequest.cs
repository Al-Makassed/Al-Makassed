using Makassed.Contracts.PolicyDependency;
using Microsoft.AspNetCore.Http;

namespace Makassed.Contracts.Policy;

public record CreatePolicyRequest
{
    public required string Name { get; set; }
    
    public required IFormFile MainFile { get; set; }
    
    public required Guid ChapterId { get; set; }

}