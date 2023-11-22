using ErrorOr;
using Makassed.Api.Repositories;
using Makassed.Api.Models.Domain;
using Makassed.Api.ServiceErrors;
using Microsoft.IdentityModel.Tokens;
using Sieve.Models;
using Makassed.Api.Services.Storage;
using Makassed.Api.Services.Users;

namespace Makassed.Api.Services.Policies;

public class PolicyService : IPolicyService
{
    private readonly IPolicyRepository _policyRepository;
    private readonly ILocalFileStorageService _localFileStorageService;
    private readonly IChapterRepository _chapterRepository;
    private readonly IUserService _userService;
    private readonly IUnitOfWork _unitOfWork;

    public PolicyService(
        IPolicyRepository policyRepository,
        ILocalFileStorageService localFileStorageService, 
        IChapterRepository chapterRepository,
        IUserService userService,
        IUnitOfWork unitOfWork)
    {
        _policyRepository = policyRepository;
        _localFileStorageService = localFileStorageService;
        _chapterRepository = chapterRepository;
        _userService = userService;
        _unitOfWork = unitOfWork;
    }
    private async Task<bool> IsUniqueName(string name)
    {
        var policy = await _policyRepository.GetPolicyByName(name);

        return policy is null;
    }

    public async Task<List<Policy>> GetPoliciesAsync(SieveModel sieveModel, Guid chapterId)
    {
        return await _policyRepository.GetPoliciesAsync(sieveModel, chapterId);
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

    public async Task<ErrorOr<Created>> CreatePolicyAsync(Guid chapterId, Policy policy)
    {
        var userRole = await _userService.GetUserRoleAsync();

        if (userRole == null)
            return Errors.User.Unauthorized;

        var existedChapterResult = await CheckChapterExists(chapterId);

        if (existedChapterResult is null)
            return Errors.Chapter.NotFound;

        if (!await IsUniqueName(policy.Name))
            return Errors.Policy.NameDuplication;

        policy.ChapterId = chapterId;
        
        policy.PdfUrl = await _localFileStorageService.UploadFileAndGetUrlAsync(policy.MainFile);

        policy.PageCount = _localFileStorageService.GetPdfFilePageCount(policy.MainFile);

        policy.CreatorId = _userService.GetUserId()!;

        if(userRole.Equals("Admin"))
            policy.IsApproved = true;
        
        await _policyRepository.CreatePolicyAsync(policy);

        await _chapterRepository.UpdateChapterEnableStateAsync(existedChapterResult.Id);

        await _unitOfWork.SaveChangesAsync();

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
        policy.PdfUrl = await _localFileStorageService.UploadFileAndGetUrlAsync(policy.MainFile);
        policy.PageCount = _localFileStorageService.GetPdfFilePageCount(policy.MainFile);
        
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