using Makassed.Api.Models.Domain;

namespace Makassed.Api.Repositories;

public interface IPolicyDependencyRepository
{
    Task CreatePolicyDependenciesAsync(List<Dependency> policyDependencies);
    Task<List<Dependency>> GetPolicyDependenciesAsync(string? filterOn, string? filterQuery);
}