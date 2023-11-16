using Makassed.Api.Models.Domain;
using Makassed.Contracts.Enums;

namespace Makassed.Api.Repositories;

public interface IPolicyDependencyRepository
{
    Task CreatePolicyDependencyAsync(Dependency policyDependency);
    
    Task<List<Dependency>> GetPolicyDependenciesAsync(string? filterOn, string? filterQuery);
    
    Task<Dependency?> GetPolicyDependencyByCodeAsync(string code);
    
    Task<Dependency?> DeletePolicyDependencyAsync(string code);
    
    Task<List<Dependency>?> DeleteAllPolicyDependencyTypeAsync(PolicyDependencyType type, Guid policyId);
    
    Task<Dependency?> UpdatePolicyDependencyAsync(string code, Dependency policyDependency);
    
    Task UpdatePoliciesDependenciesCodesAsync(Guid policyId, List<string> newCodes, List<string> oldCodes);
}