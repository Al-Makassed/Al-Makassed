using Makassed.Api.Models.Domain;
using Makassed.Contracts.Enums;

namespace Makassed.Api.Repositories;

public interface IPolicyDependencyRepository
{
    Task CreatePolicyDependenciesAsync(List<Dependency> policyDependencies);
    Task<List<Dependency>> GetPolicyDependenciesAsync(string? filterOn, string? filterQuery);
    Task<Dependency?> GetPolicyDependencyByCodeAsync(string code);
    Task<Dependency?> DeletePolicyDependencyAsync(string code);
    Task<List<Dependency>?> DeleteAllPolicyDependencyTypeAsync(PolicyDependencyType type, string policyCode);
    Task<Dependency?> UpdatePolicyDependencyAsync(string code, Dependency policyDependency);
}