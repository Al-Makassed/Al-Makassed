using Makassed.Api.Models.Domain;
using Makassed.Contracts.Enums;
using Sieve.Models;

namespace Makassed.Api.Repositories.Interfaces;

public interface IPolicyDependencyRepository
{
    Task CreatePolicyDependencyAsync(Dependency policyDependency);
    
    Task<List<Dependency>> GetPolicyDependenciesAsync(Guid policyId, SieveModel sieveModel);
    
    Task<Dependency?> GetPolicyDependencyByIdAsync(Guid id);
    
    Task<Dependency?> DeletePolicyDependencyAsync(Guid id);
    
    Task<List<Dependency>?> DeleteAllPolicyDependencyTypeAsync(PolicyDependencyType type, Guid policyId);
    
    Task<Dependency?> UpdatePolicyDependencyAsync(Guid id, Dependency policyDependency);
}