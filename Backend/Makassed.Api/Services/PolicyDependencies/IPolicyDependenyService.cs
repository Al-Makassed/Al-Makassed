using ErrorOr;
using Makassed.Api.Models.Domain;

namespace Makassed.Api.Services.PolicyDependencies;

public interface IPolicyDependencyService
{
    Task<ErrorOr<Created>> CreatePolicyDependenciesAsync(List<Dependency> policyDependencies, string policyCode);
    Task<List<Dependency>> GetPolicyDependenciesAsync(string? filterOn, string? filterQuery);
}