using Makassed.Api.Data;
using Makassed.Api.Models.Domain;
using Makassed.Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Sieve.Models;
using Sieve.Services;

namespace Makassed.Api.Repositories.Implementations;

public class SqlSubmissionRepository : ISubmissionRepository
{
    private readonly MakassedDbContext _dbContext;
    private readonly ISieveProcessor _sieveProcessor;

    public SqlSubmissionRepository(MakassedDbContext dbContext, ISieveProcessor sieveProcessor)
    {
        _dbContext = dbContext;
        _sieveProcessor = sieveProcessor;
    }

    public async Task<List<Submission>> GetAllSubmissionsAsync(SieveModel sieveModel)
    {
        var submissions = _dbContext.Submissions.AsNoTracking();

        return await _sieveProcessor.Apply(sieveModel, submissions).ToListAsync();
    }

    public async Task<Submission> AddSubmission(Submission submission)
    {
        var createdSubmission = await _dbContext.Submissions.AddAsync(submission);
        await _dbContext.SaveChangesAsync();

        return createdSubmission.Entity;
    }

    public async Task<Submission?> GetSubmissionByIdAsync(Guid id)
    {
        return await _dbContext.Submissions
            .Include(s => s.Answers)
            .ThenInclude(a => a.Field)
            .FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task<List<Submission>> GetFocalPointTaskSubmissionsAsync(Guid focalPointTaskId)
    {
        return await _dbContext.Submissions
            .Include(s => s.Submitter)
            .Where(s => s.FocalPointTaskId == focalPointTaskId)
            .ToListAsync();
    }
}
