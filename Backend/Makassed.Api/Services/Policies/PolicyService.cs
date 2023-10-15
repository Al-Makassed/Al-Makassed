using ErrorOr;
using Makassed.Api.Repositories;
using Makassed.Api.Models.Domain;
using Makassed.Api.ServiceErrors;
using Makassed.Api.Services.SharedServices;
using Makassed.Api.Services.Chapters;
using Microsoft.IdentityModel.Tokens;

namespace Makassed.Api.Services.Policies;

public class PolicyService : IPolicyService
{
    private readonly IPolicyRepository _policyRepository;
    private readonly ISharedService _sharedService;
    private readonly IChapterService _chapterService;

    public PolicyService(IPolicyRepository policyRepository, ISharedService sharedService, IChapterService chapterService)
    {
        _policyRepository = policyRepository;
        _sharedService = sharedService;
        _chapterService = chapterService;
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

    public async Task<ErrorOr<Created>> CreatePolicyAsync(Policy policy)
    {
        var chapterExistsResult = await CheckChapterExists(policy.ChapterId);

        if (chapterExistsResult.IsError)
            return chapterExistsResult.Errors;

        if (!await IsUniqueName(policy.Name))
            return Errors.Policy.NameDuplication;

        policy.Code = _sharedService.GetCode(chapterExistsResult.Value.Name, policy.Name, chapterExistsResult.Value.Policies.Count);
        
        policy.PdfUrl = await _sharedService.GetFilePathUrl(policy.MainFile);

        policy.PageCount = _sharedService.GetFilePageCount(policy.MainFile);
        
        await _policyRepository.CreatePolicyAsync(policy);

        return Result.Created;
    }

    public async Task<ErrorOr<Deleted>> DeletePolicyAsync(string code)
    {
        var deletedPolicy = await _policyRepository.DeletePolicyAsync(code);
            
        return deletedPolicy is null ? Errors.Policy.NotFound : Result.Deleted;
    }

    public async Task<ErrorOr<Updated>> UpdatePolicyAsync(string code, Policy policy)
    {
        var existedPolicyResult = await GetPolicyByCodeAsync(code);

        if (existedPolicyResult.IsError)
            return existedPolicyResult.Errors;
        
        if(!existedPolicyResult.Value.Name.Equals(policy.Name))
            policy.Code = _sharedService.GetCode(existedPolicyResult.Value.Chapter.Name, policy.Name, existedPolicyResult.Value.Chapter.Policies.Count);

        if (!existedPolicyResult.Value.MainFile.Equals(policy.MainFile))
        {
            policy.PdfUrl = await _sharedService.GetFilePathUrl(policy.MainFile);
            policy.PageCount = _sharedService.GetFilePageCount(policy.MainFile);
        }
        
        await _policyRepository.UpdatePolicyAsync(code, policy, existedPolicyResult.Value);
            
        return Result.Updated;
    }

    public async Task<ErrorOr<List<Policy>>> DeleteAllChapterPoliciesAsync(Guid chapterId)
    {
        var deletedPolicies = await _policyRepository.DeleteAllChapterPoliciesAsync(chapterId);

        return deletedPolicies is null ? Errors.Policy.NotFoundChapterPolicies : deletedPolicies; 
    }

    // Edit policies codes due to chapter name change
    public async Task EditChapterPoliciesCodesAsync(Guid chapterId, string newChapterName)
    {
        var chapterPolicies = await _policyRepository.GetChapterPoliciesAsync(chapterId);

        if (chapterPolicies.IsNullOrEmpty())
            return;

        foreach (var chapterPolicy in chapterPolicies)
        {
            chapterPolicy.Code = _sharedService.UpdateCodeFirstSection(chapterPolicy.Code, newChapterName);
        }

        await _policyRepository.UpdatePoliciesCodesAsync();
    }
}