using ErrorOr;
using Makassed.Api.Models.Domain;
using Makassed.Api.Repositories;
using Makassed.Api.Services.Policies;
using Makassed.Api.Services.SharedServices;

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
    
    public async Task<ErrorOr<Created>> CreatePolicyDependenciesAsync(List<Dependency> policyDependencies, string policyCode)
    {
        var findPolicyResult = await _policyService.GetPolicyByCodeAsync(policyCode);

        if (findPolicyResult.IsError)
            return findPolicyResult.Errors;

        foreach (var dependency in policyDependencies)
        {
            dependency.PolicyCode = policyCode;
            dependency.PdfUrl = await _sharedService.GetFilePathUrl(dependency.File);
            dependency.PagesCount = _sharedService.GetFilePageCount(dependency.File);
        }

        await _policyDependencyRepository.CreatePolicyDependenciesAsync(policyDependencies);
        
        return Result.Created;
    }

    public Task<List<Dependency>> GetPolicyDependenciesAsync(string? filterOn, string? filterQuery)
    {
        return _policyDependencyRepository.GetPolicyDependenciesAsync(filterOn, filterQuery);
    }
}