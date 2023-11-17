using ErrorOr;
using Makassed.Api.Models.Domain;
using Makassed.Api.Repositories;
using Makassed.Api.ServiceErrors;
using Makassed.Api.Services.Policies;
using Makassed.Api.Services.SharedServices;
using Makassed.Contracts.Enums;
using Policy = Makassed.Api.Models.Domain.Policy;

namespace Makassed.Api.Services.PolicyDependencies;

public class PolicyDependencyService : IPolicyDependencyService
{
    private readonly IPolicyDependencyRepository _policyDependencyRepository;
    private readonly IPolicyService _policyService;
    private readonly ISharedService _sharedService;

    public PolicyDependencyService(IPolicyDependencyRepository policyDependencyRepository, IPolicyService policyService, ISharedService sharedService)
    {
        _policyDependencyRepository = policyDependencyRepository;
        _policyService = policyService;
        _sharedService = sharedService;
    }

    private async Task<ErrorOr<Policy>> CheckExistedPolicy(Guid id)
    {
        var findPolicyResult = await _policyService.GetPolicyByIdAsync(id);

        return findPolicyResult;
    }

    public Task<List<Dependency>> GetPolicyDependenciesAsync(Guid policyId, string? filterOn, string? filterQuery)
    {
        return _policyDependencyRepository.GetPolicyDependenciesAsync(policyId, filterOn, filterQuery);
    }

    public Task<Dependency?> GetPolicyDependencyByIdAsync(Guid id)
    {
        return _policyDependencyRepository.GetPolicyDependencyByIdAsync(id);
    }

    public async Task<ErrorOr<Dependency>> CreatePolicyDependencyAsync(Dependency policyDependency, Guid policyId)
    {
        var existedPolicyResult = await CheckExistedPolicy(policyId);

        if (existedPolicyResult.IsError)
            return existedPolicyResult.Errors;

        policyDependency.PolicyId = policyId;

        policyDependency.PdfUrl = await _sharedService.GetFilePathUrl(policyDependency.File);

        policyDependency.PagesCount = _sharedService.GetFilePageCount(policyDependency.File);

        await _policyDependencyRepository.CreatePolicyDependencyAsync(policyDependency);

        return policyDependency;
    }

    public async Task<ErrorOr<Deleted>> DeletePolicyDependencyAsync(Guid id)
    {
        var deletionResult = await _policyDependencyRepository.DeletePolicyDependencyAsync(id);

        return deletionResult is null ? Errors.PolicyDependency.NotFound : Result.Deleted;
    }

    public async Task<ErrorOr<List<Dependency>>> DeleteAllPolicyDependencyTypeAsync(PolicyDependencyType type, Guid policyId)
    {
        var deletedPolicies = await _policyDependencyRepository.DeleteAllPolicyDependencyTypeAsync(type, policyId);
        
        return deletedPolicies is null ? Errors.PolicyDependency.NotFoundPolicyDependenciesType : deletedPolicies;
    }

    public async Task<ErrorOr<Updated>> UpdatePolicyDependencyAsync(Guid id, Dependency policyDependency)
    {
        policyDependency.PdfUrl = await _sharedService.GetFilePathUrl(policyDependency.File);
        policyDependency.PagesCount = _sharedService.GetFilePageCount(policyDependency.File);
        
        var updatedPolicyDependency = await _policyDependencyRepository.UpdatePolicyDependencyAsync(id, policyDependency);

        return updatedPolicyDependency is null ? Errors.PolicyDependency.NotFound : Result.Updated;
    }
}