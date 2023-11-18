using ErrorOr;
using Makassed.Api.Models.Domain;
using Makassed.Contracts.Enums;
using Sieve.Models;

namespace Makassed.Api.Services.PolicyDependencies;

public interface IPolicyDependencyService
{
    Task<List<Dependency>> GetPolicyDependenciesAsync(Guid policyId, SieveModel sieveModel);
    
    Task<Dependency?> GetPolicyDependencyByIdAsync(Guid id);
    
    Task<ErrorOr<Dependency>> CreatePolicyDependencyAsync(Dependency policyDependency, Guid policyId);
    
    Task<ErrorOr<Deleted>> DeletePolicyDependencyAsync(Guid id);
    
    Task<ErrorOr<List<Dependency>>> DeleteAllPolicyDependencyTypeAsync(PolicyDependencyType type, Guid policyId);
    
    Task<ErrorOr<Updated>> UpdatePolicyDependencyAsync(Guid id, Dependency policyDependency);
}