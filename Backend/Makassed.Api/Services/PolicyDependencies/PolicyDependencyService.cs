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

    public Task<List<Dependency>> GetPolicyDependenciesAsync(string? filterOn, string? filterQuery)
    {
        return _policyDependencyRepository.GetPolicyDependenciesAsync(filterOn, filterQuery);
    }

    public Task<Dependency?> GetPolicyDependencyByCodeAsync(string code)
    {
        return _policyDependencyRepository.GetPolicyDependencyByCodeAsync(code);
    }

    public async Task<ErrorOr<Dependency>> CreatePolicyDependencyAsync(Dependency policyDependency, Guid id)
    {
        var existedPolicyResult = await CheckExistedPolicy(id);

        if (existedPolicyResult.IsError)
            return existedPolicyResult.Errors;

        var policyDependencyTypeCount = existedPolicyResult.Value.Dependencies.Where(d => d.PolicyDependencyType == policyDependency.PolicyDependencyType).ToList().Count;

        policyDependency.Code = _sharedService.GetCode(existedPolicyResult.Value.Name, policyDependency.Name, policyDependencyTypeCount);

        policyDependency.PdfUrl = await _sharedService.GetFilePathUrl(policyDependency.File);

        policyDependency.PagesCount = _sharedService.GetFilePageCount(policyDependency.File);

        await _policyDependencyRepository.CreatePolicyDependencyAsync(policyDependency);

        return policyDependency;
    }

    public async Task<ErrorOr<Deleted>> DeletePolicyDependencyAsync(string code)
    {
        var deletionResult = await _policyDependencyRepository.DeletePolicyDependencyAsync(code);

        return deletionResult is null ? Errors.PolicyDependency.NotFound : Result.Deleted;
    }

    public async Task<ErrorOr<List<Dependency>>> DeleteAllPolicyDependencyTypeAsync(PolicyDependencyType type, Guid policyId)
    {
        var deletedPolicies = await _policyDependencyRepository.DeleteAllPolicyDependencyTypeAsync(type, policyId);
        
        return deletedPolicies is null ? Errors.PolicyDependency.NotFoundPolicyDependenciesType : deletedPolicies;
    }

    public async Task<ErrorOr<Updated>> UpdatePolicyDependencyAsync(string code, Dependency policyDependency)
    {
        policyDependency.Code = _sharedService.UpdateCode(code, policyDependency.Name, 1);

        policyDependency.PdfUrl = await _sharedService.GetFilePathUrl(policyDependency.File);
        policyDependency.PagesCount = _sharedService.GetFilePageCount(policyDependency.File);
        
        var updatedPolicyDependency = await _policyDependencyRepository.UpdatePolicyDependencyAsync(code, policyDependency);

        return updatedPolicyDependency is null ? Errors.PolicyDependency.NotFound : Result.Updated;
    }
}