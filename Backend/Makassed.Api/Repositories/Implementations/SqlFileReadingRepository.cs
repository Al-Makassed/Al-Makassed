using Makassed.Api.Data;
using Makassed.Api.Models.Domain;
using Makassed.Api.Repositories.Interfaces;
using Makassed.Contracts.Readings.FileEntities;
using Microsoft.EntityFrameworkCore;
using Sieve.Models;
using Sieve.Services;

namespace Makassed.Api.Repositories.Implementations;

public class SqlFileReadingRepository : IFileReadingRepository
{
    private readonly MakassedDbContext _dbContext;
    private readonly ISieveProcessor _sieveProcessor;

    public SqlFileReadingRepository(MakassedDbContext dbContext, ISieveProcessor sieveProcessor)
    {
        _dbContext = dbContext;
        _sieveProcessor = sieveProcessor;
    }

    public async Task<PolicyUser?> GetPolicyReading(string userId, Guid policyId)
    {
        var result = await _dbContext.PolicyUsers
            .FirstOrDefaultAsync(pu => pu.UserId == userId && pu.PolicyId == policyId);

        return result;
    }

    public async Task AddPolicyReadingAsync(PolicyUser policyUser)
    {
        await _dbContext.PolicyUsers.AddAsync(policyUser);
    }

    public async Task<List<PolicyUser>> GetPoliciesReadingAsync(string userId, SieveModel sieveModel)
    {
        var query = _dbContext.PolicyUsers
            .Include(pu => pu.Policy)
            .ThenInclude(p => p.Chapter)
            .Where(pu => pu.UserId == userId)
            .Where(pu => pu.Policy.IsApproved);

        var result = await _sieveProcessor.Apply(sieveModel, query).ToListAsync();

        return result;
    }

    public async Task<float> GetAllPoliciesCountAsync()
    {
        return await _dbContext.Policies.Where(p => p.IsApproved).CountAsync();
    }

    public async Task<DependencyUser?> GetDependencyReading(string userId, Guid id)
    {
        var result = await _dbContext.DependencyUsers
            .FirstOrDefaultAsync(du => du.UserId == userId && du.DependencyId == id);

        return result;
    }

    public async Task AddDependencyReadingAsync(DependencyUser dependencyUser)
    {
        await _dbContext.DependencyUsers.AddAsync(dependencyUser);
    }

    public async Task<List<DependencyUser>> GetDependenciesReadingAsync(string userId, SieveModel sieveModel)
    {
        var query = _dbContext.DependencyUsers
            .Include(du => du.Dependency)
            .ThenInclude(d => d.Policy)
            .ThenInclude(p => p.Chapter)
            .Where(du => du.UserId == userId)
            .Where(du => du.Dependency.IsApproved);

        var result = await _sieveProcessor.Apply(sieveModel, query).ToListAsync();

        return result;
    }

    public async Task<float> GetAllDependenciesCountAsync()
    {
        return await _dbContext.Dependencies.Where(d => d.IsApproved).CountAsync();
    }

    public async Task<List<GetAllFileEntitiesResponse>> GetApprovedEntitiesAsync()
    {
        var policyEntities = await _dbContext.Policies
            .Where(p => p.IsApproved && p.CreatedAt > DateTime.Now.AddDays(-7))
            .Select(p => new GetAllFileEntitiesResponse
            {
                Id = p.Id,
                Name = p.Name,
                CreatedAt = p.CreatedAt,
                ChapterId = p.ChapterId,
                ChapterName = p.Chapter.Name,
                PdfUrl = p.PdfUrl!,
                Type = FileEntityType.Policy
            }).ToListAsync();

        var dependencyEntities = await _dbContext.Dependencies
            .Where(d => d.IsApproved && d.CreatedAt > DateTime.Now.AddDays(-7))
            .Select(d => new DependencyFileEntityDto
            {
                Id = d.Id,
                Name = d.Name,
                CreatedAt = d.CreatedAt,
                PdfUrl = d.PdfUrl,
                ChapterId = d.Policy.ChapterId,
                ChapterName = d.Policy.Chapter.Name,
                PolicyId = d.PolicyId,
                PolicyName = d.Policy.Name,
                Type = FileEntityType.Dependency
            }).ToListAsync();

        var entities = policyEntities.Union(dependencyEntities);

        return entities.ToList();
    }

}
