using Makassed.Contracts.Enums;
using Microsoft.AspNetCore.Http;

namespace Makassed.Contracts.PolicyDependency;

public record CreatePolicyDependencyRequest
{
    public required string Code { get; set; }
    
    public required PolicyDependencyType Type { get; set; }
    
    public required string Name { get; set; }

    public required IFormFile File { get; set; }

    public required int EstimatedTimeInMin { get; set; }
}