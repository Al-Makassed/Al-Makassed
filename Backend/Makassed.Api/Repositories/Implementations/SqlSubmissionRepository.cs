using Makassed.Api.Data;
using Makassed.Api.Models.Domain;
using Makassed.Api.Repositories.Interfaces;

namespace Makassed.Api.Repositories.Implementations;

public class SqlSubmissionRepository : ISubmissionRepository
{
    private readonly MakassedDbContext _dbContext;

    public SqlSubmissionRepository(MakassedDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Submission> AddSubmission(Submission submission)
    {
        var createdSubmission = await _dbContext.Submissions.AddAsync(submission);
        await _dbContext.SaveChangesAsync();

        return createdSubmission.Entity;
    }
}
