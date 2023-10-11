using ErrorOr;
using Makassed.Api.Repositories;
using Makassed.Api.Models.Domain;
using Makassed.Api.ServiceErrors;
using Makassed.Api.Services.SharedServices;
using Makassed.Api.Services.Chapters;

namespace Makassed.Api.Services.Policies;

public class PolicyService : IPolicyService
{
    private readonly IPolicyRepository _policyRepository;
    private readonly ISharedService _sharedService;
    private readonly IPolicyDependencyRepository _policyDependencyRepository;
    private readonly IChapterService _chapterService;

    public PolicyService(IPolicyRepository policyRepository, ISharedService sharedService, IPolicyDependencyRepository policyDependencyRepository, IChapterService chapterService)
    {
        _policyRepository = policyRepository;
        _sharedService = sharedService;
        _policyDependencyRepository = policyDependencyRepository;
        _chapterService = chapterService;
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

    private async Task<ErrorOr<Chapter>> CheckChapterExists(Guid id) 
    { 
        var getChapterResult = await _chapterService.GetChapterByIdAsync(id);
        
        return getChapterResult;
    }

    public async Task<ErrorOr<Created>> CreatePolicyAsync(Policy policy, List<Dependency> policyDependencies)
    {
        var chpaterExistsResult = await CheckChapterExists(policy.ChapterId);

        if (chpaterExistsResult.IsError)
            return chpaterExistsResult.Errors;

        if (!await IsUniqueName(policy.Name))
            return Errors.Policy.NameDuplication;

        policy.Code = _sharedService.GetCode(chpaterExistsResult.Value.Name, policy.Name, chpaterExistsResult.Value.Policies.Count);
        
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

