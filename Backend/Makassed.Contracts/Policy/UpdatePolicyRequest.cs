using Microsoft.AspNetCore.Http;

namespace Makassed.Contracts.Policy;

public record UpdatePolicyRequest
{
    public required string Code { get; set; }
    
    public required string Name { get; set; }
    
    public IFormFile? MainFile { get; set; }
    
    public int EstimatedTimeInMin { get; set; }

    public string? Summary { get; set; }
}