using ErrorOr;
using Makassed.Api.Models.Domain;
using Makassed.Contracts.Enums;

namespace Makassed.Api.Services.PolicyDependencies;

public interface IPolicyDependencyService
{
    Task<List<Dependency>> GetPolicyDependenciesAsync(string? filterOn, string? filterQuery);
    
    Task<Dependency?> GetPolicyDependencyByCodeAsync(string code);
    
    Task<ErrorOr<Dependency>> CreatePolicyDependencyAsync(Dependency policyDependency, string policyCode);
    
    Task<ErrorOr<Deleted>> DeletePolicyDependencyAsync(string code);
    
    Task<ErrorOr<List<Dependency>>> DeleteAllPolicyDependencyTypeAsync(PolicyDependencyType type, string policyCode);
    
    Task<ErrorOr<Updated>> UpdatePolicyDependencyAsync(string code, Dependency policyDependency);
}