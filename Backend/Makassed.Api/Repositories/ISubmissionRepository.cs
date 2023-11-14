using Makassed.Api.Models.Domain;

namespace Makassed.Api.Repositories;

public interface ISubmissionRepository
{
    Task<Submission> AddSubmission(Submission submission);
}
