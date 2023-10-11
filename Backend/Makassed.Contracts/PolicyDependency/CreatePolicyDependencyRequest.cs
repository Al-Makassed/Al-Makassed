using Makassed.Contracts.Enums;
using Microsoft.AspNetCore.Http;

namespace Makassed.Contracts.PolicyDependency;

public record CreatePolicyDependencyRequest
{
    public required PolicyDependencyType PolicyDependencyType { get; set; }
    
    public required string Name { get; set; }

    public required IFormFile File { get; set; }

    public required int EstimatedTime { get; set; }
}