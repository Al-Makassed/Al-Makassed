using Makassed.Contracts.Policy;

namespace Makassed.Contracts.Chapter;

public record GetChapterResponse
{
    public Guid Id { get; set; }
        
    public required string Name { get; set; }
        
    public bool EnableState { get; set; }
    
    public ICollection<GetPolicyResponse> Policies { get; set; } = new List<GetPolicyResponse>();
}