using Makassed.Api.Models.Domain;

namespace Makassed.Api.Repositories
{
    public interface IPolicyRepository
    {
        Task<Policy?> GetPolicyByName(string name);
        Task<List<Policy>> FindValidPoliciesAsync(IEnumerable<string> policiesCodes);
        Task<List<Policy>> GetPoliciesAsync();
        Task<Policy?> GetPolicyByCodeAsync(string code);
        Task CreatePolicyAsync(Policy policy);
        Task<bool> CreatePolicyAsync(Policy policy, List<Dependency> dependencies);
        Task<Policy?> DeletePolicyAsync(string code);
        Task<Policy?> UpdatePolicyAsync(string code, Policy policy);
    }
}
