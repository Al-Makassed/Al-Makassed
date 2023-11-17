using Makassed.Api.Models.Domain;

namespace Makassed.Api.Repositories;

public interface IPolicyRepository
{
    Task<Policy?> GetPolicyByName(string name);
    
    Task<List<Policy>> FindValidPoliciesAsync(IEnumerable<string> policiesCodes);
    
    Task<List<Policy>> GetPoliciesAsync();
    
    Task<Policy?> GetPolicyByIdAsync(Guid id);
    
    Task CreatePolicyAsync(Policy policy);
    
    Task<Policy?> DeletePolicyAsync(Guid id);
    
    Task<Policy?> UpdatePolicyAsync(Guid id, Policy policy);
    
    Task<List<Policy>?> DeleteAllChapterPoliciesAsync(Guid chapterId);
    
    Task UpdatePoliciesCodesAsync(Guid chapterId, List<string> newCodes, IEnumerable<string> oldCodes);
}