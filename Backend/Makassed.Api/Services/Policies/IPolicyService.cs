using ErrorOr;
using Makassed.Api.Models.Domain;
using Sieve.Models;

namespace Makassed.Api.Services.Policies;

public interface IPolicyService
{
    Task<List<Policy>> GetPoliciesAsync(SieveModel sieveModel, Guid chapterId);
        
    Task<ErrorOr<Policy>> GetPolicyByIdAsync(Guid id);
        
    Task<ErrorOr<Created>> CreatePolicyAsync(Guid chapterId, Policy policy);
        
    Task<ErrorOr<Deleted>> DeletePolicyAsync(Guid id);
        
    Task<ErrorOr<Updated>> UpdatePolicyAsync(Guid id, Policy policy);
        
    Task<ErrorOr<List<Policy>>> DeleteAllChapterPoliciesAsync(Guid chapterId);
}