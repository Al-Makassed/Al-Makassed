using ErrorOr;
using Makassed.Api.Repositories;
using Makassed.Api.Models.Domain;
using Makassed.Api.ServiceErrors;
using Makassed.Api.Services.SharedServices;
using Microsoft.IdentityModel.Tokens;

namespace Makassed.Api.Services.Policies;

public class PolicyService : IPolicyService
{
    private readonly IPolicyRepository _policyRepository;
    private readonly ISharedService _sharedService;
    private readonly IChapterRepository _chapterRepository;

    public PolicyService(IPolicyRepository policyRepository, ISharedService sharedService, IChapterRepository chapterRepository)
    {
        _policyRepository = policyRepository;
        _sharedService = sharedService;
        _chapterRepository = chapterRepository;
    }
    private async Task<bool> IsUniqueName(string name)
    {
        var policy = await _policyRepository.GetPolicyByName(name);

        return policy is null;
    }

    public async Task<List<Policy>> GetPoliciesAsync()
    {
        return await _policyRepository.GetPoliciesAsync();
    }

    public async Task<ErrorOr<Policy>> GetPolicyByIdAsync(Guid id)
    {
        var policy = await _policyRepository.GetPolicyByIdAsync(id);
        
        return policy is null ? Errors.Policy.NotFound : policy;
    }

    private async Task<Chapter?> CheckChapterExists(Guid id) 
    { 
        return await _chapterRepository.GetChapterByIdAsync(id);
    }

    public async Task<ErrorOr<Created>> CreatePolicyAsync(Policy policy)
    {
        var existedChapterResult = await CheckChapterExists(policy.ChapterId);

        if (existedChapterResult is null)
            return Errors.Chapter.NotFound;

        if (!await IsUniqueName(policy.Name))
            return Errors.Policy.NameDuplication;
        
        policy.PdfUrl = await _sharedService.GetFilePathUrl(policy.MainFile);

        policy.PageCount = _sharedService.GetFilePageCount(policy.MainFile);
        
        await _policyRepository.CreatePolicyAsync(policy);

        await _chapterRepository.UpdateChapterEnableStateAsync(existedChapterResult.Id);

        return Result.Created;
    }

    public async Task<ErrorOr<Deleted>> DeletePolicyAsync(Guid id)
    {
        var deletedPolicy = await _policyRepository.DeletePolicyAsync(id);

        if (deletedPolicy is null)
            return Errors.Policy.NotFound;

        await _chapterRepository.UpdateChapterEnableStateAsync(deletedPolicy.ChapterId);
        
        return Result.Deleted;
    }

    public async Task<ErrorOr<Updated>> UpdatePolicyAsync(Guid id, Policy policy)
    {
        policy.PdfUrl = await _sharedService.GetFilePathUrl(policy.MainFile);
        policy.PageCount = _sharedService.GetFilePageCount(policy.MainFile);
        
        var updatePolicyResult = await _policyRepository.UpdatePolicyAsync(id, policy);

        if (updatePolicyResult is null)
            return Errors.Policy.NotFound;
        
        return Result.Updated;
    }

    public async Task<ErrorOr<List<Policy>>> DeleteAllChapterPoliciesAsync(Guid chapterId)
    {
        var deletedPolicies = await _policyRepository.DeleteAllChapterPoliciesAsync(chapterId);

        if (deletedPolicies is null && deletedPolicies.IsNullOrEmpty())
            return Errors.Policy.NotFoundChapterPolicies;

        await _chapterRepository.UpdateChapterEnableStateAsync(deletedPolicies![0].ChapterId);

        return deletedPolicies; 
    }
}