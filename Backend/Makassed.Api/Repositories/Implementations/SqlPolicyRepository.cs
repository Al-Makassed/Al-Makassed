using Makassed.Api.Data;
using Makassed.Api.Models.Domain;
using Makassed.Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Sieve.Models;
using Sieve.Services;

namespace Makassed.Api.Repositories.Implementations;

public class SqlPolicyRepository : IPolicyRepository
{
    private readonly MakassedDbContext _dbContext;
    private readonly ISieveProcessor _sieveProcessor;

    public SqlPolicyRepository(MakassedDbContext dbContext, ISieveProcessor sieveProcessor)
    {
        _dbContext = dbContext;
        _sieveProcessor = sieveProcessor;
    }
        
    public async Task<Policy?> GetPolicyByName(string name)
    {
        return await _dbContext.Policies.FirstOrDefaultAsync(p => p.Name == name);
    }

    public async Task CreatePolicyAsync(Policy policy)
    {
        await _dbContext.Policies.AddAsync(policy);
    }

    public async Task<List<Policy>> FindValidPoliciesAsync(IEnumerable<string> policiesCodes)
    {
        return await _dbContext.Policies.Where(p => policiesCodes.Contains(p.Code)).ToListAsync();
    }

    public async Task<List<Policy>> GetPoliciesAsync(SieveModel sieveModel, Guid ChapterId)
    {
        var policies = _dbContext.Policies.Where(p => p.ChapterId == ChapterId).Include(p => p.Dependencies).AsNoTracking();

        return await _sieveProcessor.Apply(sieveModel, policies).ToListAsync();
    }

    public async Task<Policy?> GetPolicyByIdAsync(Guid id)
    {
        return await _dbContext.Policies.Include(p => p.Dependencies).FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<Policy?> DeletePolicyAsync(Guid id)
    {
        var policy = await _dbContext.Policies.FirstOrDefaultAsync(p => p.Id == id);
            
        if (policy is null)
            return null;
            
        _dbContext.Policies.Remove(policy);

        return policy;
    }

    public async Task<Policy?> UpdatePolicyAsync(Guid id, Policy policy)
    {
        var existedPolicy = await _dbContext.Policies.FirstOrDefaultAsync(p => p.Id == id);

        if (existedPolicy is null)
            return null;

        existedPolicy.Code = policy.Code;
        existedPolicy.Name = policy.Name;
        existedPolicy.PdfUrl = policy.PdfUrl;
        existedPolicy.PageCount = policy.PageCount;
        existedPolicy.EstimatedTimeInMin = policy.EstimatedTimeInMin;
        existedPolicy.Summary = policy.Summary;
            
        await _dbContext.SaveChangesAsync();

        return existedPolicy;
    }

    private async Task<List<Policy>> GetChapterPoliciesAsync(Guid chapterId)
    {
        return await _dbContext.Policies.Where(p => p.ChapterId == chapterId).ToListAsync();
    }

    public async Task<List<Policy>?> DeleteAllChapterPoliciesAsync(Guid chapterId)
    {
        var policiesToDelete = await GetChapterPoliciesAsync(chapterId);
            
        if (policiesToDelete.IsNullOrEmpty())
            return null;
            
        _dbContext.RemoveRange(policiesToDelete);
        await _dbContext.SaveChangesAsync();

        return policiesToDelete;
    }
    
    public async Task UpdatePoliciesCodesAsync(Guid chapterId, List<string> newCodes, IEnumerable<string> oldCodes)
    {
        var existedPolicies = await _dbContext.Policies.Where(p => p.ChapterId == chapterId).Include(p => p.Dependencies).ToListAsync();
        
        if (existedPolicies.IsNullOrEmpty())
            return;

        for (int i = 0; i < existedPolicies.Count; i++)
        {
            existedPolicies[i].Code = newCodes[i];
        }
        
        await _dbContext.Policies.AddRangeAsync(existedPolicies);
        await _dbContext.SaveChangesAsync();

        var oldPolicies = await _dbContext.Policies.Where(p => oldCodes.Contains(p.Code)).ToListAsync();
        
        _dbContext.Policies.RemoveRange(oldPolicies);
        await _dbContext.SaveChangesAsync();
    }
}