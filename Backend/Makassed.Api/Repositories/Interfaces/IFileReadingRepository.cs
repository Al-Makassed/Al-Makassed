using Makassed.Api.Models.Domain;
using Sieve.Models;

namespace Makassed.Api.Repositories.Interfaces;

public interface IFileReadingRepository
{
    Task<PolicyUser?> GetPolicyReading(string userId, Guid policyId);

    Task AddPolicyReadingAsync(PolicyUser policyUser);

    Task<List<PolicyUser>> GetPoliciesReadingAsync(string userId, SieveModel sieveModel);

    Task<float> GetAllPoliciesCountAsync();


    Task<DependencyUser?> GetDependencyReading(string userId, Guid id);

    Task AddDependencyReadingAsync(DependencyUser dependencyUser);

    Task<List<DependencyUser>> GetDependenciesReadingAsync(string userId, SieveModel sieveModel);

    Task<float> GetAllDependenciesCountAsync();
}
