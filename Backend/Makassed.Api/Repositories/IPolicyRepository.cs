using Makassed.Api.Models.Domain;

namespace Makassed.Api.Repositories;

public interface IPolicyRepository
{
    Task<Policy?> GetPolicyByName(string name);
    Task<List<Policy>> FindValidPoliciesAsync(IEnumerable<string> policiesCodes);
    Task<List<Policy>> GetPoliciesAsync();
    Task<Policy?> GetPolicyByCodeAsync(string code);
    Task CreatePolicyAsync(Policy policy);
    Task<Policy?> DeletePolicyAsync(string code);
    Task<Policy?> UpdatePolicyAsync(string code, Policy policy, Policy existedPolicy);
    Task<List<Policy>> GetChapterPoliciesAsync(Guid chapterId);
    Task<List<Policy>?> DeleteAllChapterPoliciesAsync(Guid chapterId);
    Task UpdatePoliciesCodesAsync();
}