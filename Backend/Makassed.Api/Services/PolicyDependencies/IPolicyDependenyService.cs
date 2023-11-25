using ErrorOr;
using Makassed.Api.Models.Domain;
using Makassed.Contracts.Enums;
using Sieve.Models;

namespace Makassed.Api.Services.PolicyDependencies;

public interface IPolicyDependencyService
{
    Task<ErrorOr<List<Dependency>>> GetPolicyDependenciesAsync(Guid chapterId, Guid policyId, SieveModel sieveModel);
    
    Task<ErrorOr<Dependency>> GetPolicyDependencyByIdAsync(Guid policyId, Guid id);
    
    Task<ErrorOr<Dependency>> CreatePolicyDependencyAsync(Dependency policyDependency, Guid policyId, Guid chapterId);
    
    Task<ErrorOr<Deleted>> DeletePolicyDependencyAsync(Guid policyId, Guid id);
    
    Task<ErrorOr<List<Dependency>>> DeleteAllPolicyDependencyTypeAsync(PolicyDependencyType type, Guid policyId);
    
    Task<ErrorOr<Updated>> UpdatePolicyDependencyAsync(Guid policyId, Guid id, Dependency policyDependency);
}