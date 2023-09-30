using Makassed.Api.Models;

namespace Makassed.Api.Repositories
{
    public interface IPolicyRepository
    {
        Task<Policy?> GetPolicyByName(string name);
        Task<List<Policy>> FindValidPoliciesAsync(IEnumerable<string> policiesCodes);
    }
}
