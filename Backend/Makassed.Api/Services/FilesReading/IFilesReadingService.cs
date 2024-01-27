using ErrorOr;
using Makassed.Api.Models.Domain;
using Makassed.Contracts.General;
using Makassed.Contracts.Readings.FileEntities;
using Sieve.Models;

namespace Makassed.Api.Services.FilesReading;

public interface IFilesReadingService
{
    Task<ErrorOr<Updated>> FinishReadingPolicyFile(Guid policyId);

    Task<ErrorOr<PercentageSuccessResponse>> GetReadPoliciesPercentage(SieveModel sieveModel);

    Task<ErrorOr<Updated>> FinishReadingDependencyFile(Guid id);

    Task<ErrorOr<PercentageSuccessResponse>> GetReadDependenciesPercentage(SieveModel sieveModel);

    Task<ErrorOr<List<PolicyUser>>> GetFinishedPolicies(SieveModel sieveModel);

    Task<ErrorOr<List<DependencyUser>>> GetFinishedDependencies(SieveModel sieveModel);

    Task<List<GetAllFileEntitiesResponse>> GetApprovedSystemFiles();
}
