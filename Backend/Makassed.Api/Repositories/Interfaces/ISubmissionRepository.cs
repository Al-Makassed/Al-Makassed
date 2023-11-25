using Makassed.Api.Models.Domain;

namespace Makassed.Api.Repositories.Interfaces;

public interface ISubmissionRepository
{
    Task<Submission> AddSubmission(Submission submission);
}
