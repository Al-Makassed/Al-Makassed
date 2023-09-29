using Makassed.Api.Repositories;

namespace Makassed.Api.Services.Policy
{
    public class PolicyService : IPolicyService
    {
        private readonly IPolicyRepository _policyRepository;

        public PolicyService(IPolicyRepository policyRepository)
        {
            _policyRepository = policyRepository;
        }
        public async Task<bool> IsUniqueName(string name)
        {
            var policy = await _policyRepository.GetPolicyByName(name);

            if (policy is null)
                return true;

            return false;
        }
    }
}
