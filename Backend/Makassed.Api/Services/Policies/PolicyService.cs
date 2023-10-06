using ErrorOr;
using Makassed.Api.Repositories;
using Makassed.Api.Models.Domain;
using Makassed.Api.ServiceErrors;
using Makassed.Api.Services.SharedServices;

namespace Makassed.Api.Services.Policies;

public class PolicyService : IPolicyService
{
    private readonly IPolicyRepository _policyRepository;
    private readonly ISharedService _sharedService;
    private readonly IPolicyDependencyRepository _policyDependencyRepository;

    public PolicyService(IPolicyRepository policyRepository, ISharedService sharedService, IPolicyDependencyRepository policyDependencyRepository)
    {
        _policyRepository = policyRepository;
        _sharedService = sharedService;
        _policyDependencyRepository = policyDependencyRepository;
    }
    public async Task<bool> IsUniqueName(string name)
    {
        var policy = await _policyRepository.GetPolicyByName(name);

        return policy is null;
    }

    public async Task<List<Policy>> GetPoliciesAsync()
    {
        return await _policyRepository.GetPoliciesAsync();
    }

    public async Task<ErrorOr<Policy>> GetPolicyByCodeAsync(string code)
    {
        var policy = await _policyRepository.GetPolicyByCodeAsync(code);
        
        return policy is null ? Errors.Policy.NotFound : policy;
    }

    public async Task<ErrorOr<Created>> CreatePolicyAsync(Policy policy, List<Dependency> policyDependencies)
    {
        if (!await IsUniqueName(policy.Name))
            return Errors.Policy.NameDuplication;
        
        policy.PdfUrl = await _sharedService.GetFilePathUrl(policy.MainFile);

        policy.Dependencies = new List<Dependency>();
        
        var createPolicyResult = await _policyRepository.CreatePolicyAsync(policy, policyDependencies);

        if (createPolicyResult)
        {
            foreach (var policyDependency in policyDependencies)
            {
                policyDependency.PolicyCode = policy.Code;            
            }

            await _policyDependencyRepository.CreatePolicyDependenciesAsync(policyDependencies);
        }

        return  createPolicyResult ? Result.Created : Errors.Policy.Conflict;
    }

    public async Task<ErrorOr<Deleted>> DeletePolicyAsync(string code)
    {
        var deletedPolicy = await _policyRepository.DeletePolicyAsync(code);
            
        return deletedPolicy is null ? Errors.Policy.NotFound : Result.Deleted;
    }

    public async Task<ErrorOr<Updated>> UpdatePolicyAsync(string code, Policy policy)
    {
        policy.PdfUrl = await _sharedService.GetFilePathUrl(policy.MainFile);
        
        var updatedPolicy = await _policyRepository.UpdatePolicyAsync(code, policy);
            
        return updatedPolicy is null ? Errors.Policy.NotFound : Result.Updated;
    }
}

