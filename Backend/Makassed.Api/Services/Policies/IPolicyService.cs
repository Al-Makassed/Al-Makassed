using ErrorOr;
using Makassed.Api.Models.Domain;

namespace Makassed.Api.Services.Policies;

public interface IPolicyService
{
    Task<List<Policy>> GetPoliciesAsync();
        
    Task<ErrorOr<Policy>> GetPolicyByIdAsync(Guid id);
        
    Task<ErrorOr<Created>> CreatePolicyAsync(Policy policy);
        
    Task<ErrorOr<Deleted>> DeletePolicyAsync(Guid id);
        
    Task<ErrorOr<Updated>> UpdatePolicyAsync(Guid id, Policy policy);
        
    Task<ErrorOr<List<Policy>>> DeleteAllChapterPoliciesAsync(Guid chapterId);
}