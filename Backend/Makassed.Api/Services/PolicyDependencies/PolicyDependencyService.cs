using ErrorOr;
using Makassed.Api.Models.Domain;
using Makassed.Api.Repositories;
using Makassed.Api.Repositories.Interfaces;
using Makassed.Api.ServiceErrors;
using Makassed.Api.Services.Policies;
using Makassed.Api.Services.Storage;
using Makassed.Api.Services.Users;
using Makassed.Contracts.Enums;
using Sieve.Models;

namespace Makassed.Api.Services.PolicyDependencies;

public class PolicyDependencyService : IPolicyDependencyService
{
    private readonly IPolicyDependencyRepository _policyDependencyRepository;
    private readonly IPolicyService _policyService;
    private readonly ILocalFileStorageService _localFileStorageService;
    private readonly IUserService _userService;

    public PolicyDependencyService(
        IPolicyDependencyRepository policyDependencyRepository,
        IPolicyService policyService,
        ILocalFileStorageService localFileStorageService,
        IUserService userService)
    {
        _policyDependencyRepository = policyDependencyRepository;
        _policyService = policyService;
        _localFileStorageService = localFileStorageService;
        _userService = userService;
    }

    // check if dependency belongs to the policy
    private async Task<bool> CheckDependencyBelongsToPolicy(Guid policyId, Guid id)
    {
        var dependency = await _policyDependencyRepository.GetPolicyDependencyByIdAsync(id);

        return dependency?.PolicyId == policyId;
    }

    public async Task<ErrorOr<List<Dependency>>> GetPolicyDependenciesAsync(Guid chapterId, Guid policyId, SieveModel sieveModel)
    {
        var existedPolicyResult = await _policyService.GetPolicyByIdAsync(chapterId, policyId);

        if (existedPolicyResult.IsError)
            return existedPolicyResult.Errors;

        return await _policyDependencyRepository.GetPolicyDependenciesAsync(policyId, sieveModel);
    }

    public async Task<ErrorOr<Dependency>> GetPolicyDependencyByIdAsync(Guid policyId, Guid id)
    {
        if (!await CheckDependencyBelongsToPolicy(policyId, id))
            return Errors.PolicyDependency.DoesNotBelongToPolicy;

        var policyDependency = await _policyDependencyRepository.GetPolicyDependencyByIdAsync(id);

        return policyDependency is null ? Errors.PolicyDependency.NotFound : policyDependency;
    }

    public async Task<ErrorOr<Dependency>> CreatePolicyDependencyAsync(Dependency policyDependency, Guid policyId, Guid chapterId)
    {
        var userRole = await _userService.GetUserRoleAsync();

        if (userRole == null)
            return Errors.User.Unauthorized;

        var existedPolicyResult = await _policyService.GetPolicyByIdAsync(chapterId, policyId);

        if (existedPolicyResult.IsError)
            return existedPolicyResult.Errors;

        if (!existedPolicyResult.Value.IsApproved)
            return Errors.PolicyDependency.CannotAdd;

        policyDependency.PolicyId = policyId;

        policyDependency.PdfUrl = await _localFileStorageService.UploadFileAndGetUrlAsync(policyDependency.File);

        policyDependency.PagesCount = _localFileStorageService.GetPdfFilePageCount(policyDependency.File);

        policyDependency.CreatorId = _userService.GetUserId()!;

        if (userRole.Equals("Admin"))
            policyDependency.IsApproved = true;

        await _policyDependencyRepository.CreatePolicyDependencyAsync(policyDependency);

        return policyDependency;
    }

    public async Task<ErrorOr<Deleted>> DeletePolicyDependencyAsync(Guid policyId, Guid id)
    {
        if (!await CheckDependencyBelongsToPolicy(policyId, id))
            return Errors.PolicyDependency.DoesNotBelongToPolicy;

        var deletionResult = await _policyDependencyRepository.DeletePolicyDependencyAsync(id);

        return deletionResult is null ? Errors.PolicyDependency.NotFound : Result.Deleted;
    }

    public async Task<ErrorOr<List<Dependency>>> DeleteAllPolicyDependencyTypeAsync(PolicyDependencyType type, Guid policyId)
    {
        var deletedPolicies = await _policyDependencyRepository.DeleteAllPolicyDependencyTypeAsync(type, policyId);
        
        return deletedPolicies is null ? Errors.PolicyDependency.NotFoundPolicyDependenciesType : deletedPolicies;
    }

    public async Task<ErrorOr<Updated>> UpdatePolicyDependencyAsync(Guid policyId, Guid id, Dependency policyDependency)
    {
        if (!await CheckDependencyBelongsToPolicy(policyId, id))
            return Errors.PolicyDependency.DoesNotBelongToPolicy;

        policyDependency.PdfUrl = await _localFileStorageService.UploadFileAndGetUrlAsync(policyDependency.File);
        policyDependency.PagesCount = _localFileStorageService.GetPdfFilePageCount(policyDependency.File);
        
        var updatedPolicyDependency = await _policyDependencyRepository.UpdatePolicyDependencyAsync(id, policyDependency);

        return updatedPolicyDependency is null ? Errors.PolicyDependency.NotFound : Result.Updated;
    }
}