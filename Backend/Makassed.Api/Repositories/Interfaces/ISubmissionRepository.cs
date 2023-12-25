using Makassed.Api.Models.Domain;
using Sieve.Models;

namespace Makassed.Api.Repositories.Interfaces;

public interface ISubmissionRepository
{
    Task<Submission> AddSubmission(Submission submission);

    Task<List<Submission>> GetAllSubmissionsAsync(SieveModel sieveModel);

    Task<Submission?> GetSubmissionByIdAsync(Guid id);    
    
    Task<List<Submission>> GetFocalPointTaskSubmissionsAsync(Guid focalPointTaskId);

}
