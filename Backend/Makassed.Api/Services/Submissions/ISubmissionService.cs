using ErrorOr;
using Makassed.Api.Models.Domain;
using Sieve.Models;

namespace Makassed.Api.Services.Submissions;

public interface ISubmissionService
{
    Task<List<Submission>> GetAllSubmissionsAsync(SieveModel sieveModel);

    Task<ErrorOr<Submission>> GetSubmissionByIdAsync(Guid id);
}
