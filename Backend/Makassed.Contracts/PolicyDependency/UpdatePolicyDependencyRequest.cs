using Microsoft.AspNetCore.Http;

namespace Makassed.Contracts.PolicyDependency;

public record UpdatePolicyDependencyRequest
{
    public required IFormFile File { get; set; }

    public required int EstimatedTime { get; set; }
}