using Makassed.Api.Models.Domain;
using Makassed.Contracts.Enums;

namespace Makassed.Api.Repositories;

public interface IPolicyDependencyRepository
{
    Task CreatePolicyDependencyAsync(Dependency policyDependency);
    
    Task<List<Dependency>> GetPolicyDependenciesAsync(Guid policyId, string? filterOn, string? filterQuery);
    
    Task<Dependency?> GetPolicyDependencyByIdAsync(Guid id);
    
    Task<Dependency?> DeletePolicyDependencyAsync(Guid id);
    
    Task<List<Dependency>?> DeleteAllPolicyDependencyTypeAsync(PolicyDependencyType type, Guid policyId);
    
    Task<Dependency?> UpdatePolicyDependencyAsync(Guid id, Dependency policyDependency);
}