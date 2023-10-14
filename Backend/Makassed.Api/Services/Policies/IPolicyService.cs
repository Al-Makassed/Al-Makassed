using ErrorOr;
using Makassed.Api.Models.Domain;

namespace Makassed.Api.Services.Policies
{
    public interface IPolicyService
    {
        Task<List<Policy>> GetPoliciesAsync();
        Task<ErrorOr<Policy>> GetPolicyByCodeAsync(string code);
        Task<ErrorOr<Created>> CreatePolicyAsync(Policy policy);
        Task<ErrorOr<Deleted>> DeletePolicyAsync(string code);
        Task<ErrorOr<Updated>> UpdatePolicyAsync(string code, Policy policy);
        Task<ErrorOr<List<Policy>>> DeleteAllChapterPoliciesAsync(Guid chapterId);
    }
}
