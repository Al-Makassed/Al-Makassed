using Makassed.Api.Data;
using Makassed.Api.Models.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Makassed.Api.Repositories;

public class SqlPolicyRepository : IPolicyRepository
{
    private readonly MakassedDbContext _dbContext;

    public SqlPolicyRepository(MakassedDbContext dbContext)
    {
        _dbContext = dbContext;
    }
        
    public async Task<Policy?> GetPolicyByName(string name)
    {
        return await _dbContext.Policies.FirstOrDefaultAsync(p => p.Name == name);
    }

    public async Task CreatePolicyAsync(Policy policy)
    {
        await _dbContext.Policies.AddAsync(policy);

        await _dbContext.SaveChangesAsync();
    }

    public async Task<List<Policy>> FindValidPoliciesAsync(IEnumerable<string> policiesCodes)
    {
        return await _dbContext.Policies.Where(p => policiesCodes.Contains(p.Code)).ToListAsync();
    }

    public async Task<List<Policy>> GetPoliciesAsync()
    {
        return await _dbContext.Policies.Include(p => p.Dependencies).ToListAsync();
    }

    public async Task<Policy?> GetPolicyByCodeAsync(string code)
    {
        return await _dbContext.Policies.Include(p => p.Dependencies).FirstOrDefaultAsync(p => p.Code == code);
    }

    public async Task<Policy?> DeletePolicyAsync(string code)
    {
        var policy = await _dbContext.Policies.FirstOrDefaultAsync(p => p.Code == code);
            
        if (policy is null)
            return null;
            
        _dbContext.Policies.Remove(policy);
        await _dbContext.SaveChangesAsync();

        return policy;
    }

    public async Task<Policy?> UpdatePolicyAsync(string code, Policy policy)
    {
        var existedPolicy = await _dbContext.Policies.FirstOrDefaultAsync(p => p.Code == code);

        if (existedPolicy is null)
            return null;

        existedPolicy.PdfUrl = policy.PdfUrl;
        existedPolicy.PageCount = policy.PageCount;
        existedPolicy.EstimatedTimeInMin = policy.EstimatedTimeInMin;

        if (!existedPolicy.Code.Equals(policy.Code))
        {
            await UpdatePolicyCodeAsync(existedPolicy.Code, policy.Code);
            existedPolicy.Name = policy.Name;
        }
            
        await _dbContext.SaveChangesAsync();

        return existedPolicy;
    }

    public async Task<List<Policy>> GetChapterPoliciesAsync(Guid chapterId)
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

    public async Task UpdatePolicyCodeAsync(string oldPolicyCode, string newPolicyCode)
    {
        var existedPolicy = await _dbContext.Policies.FirstOrDefaultAsync(p => p.Code == oldPolicyCode);

        if (existedPolicy == null)
            return;

        var newPolicy = existedPolicy;
        newPolicy.Code = newPolicyCode;

        await CreatePolicyAsync(newPolicy);

        await DeletePolicyAsync(oldPolicyCode);

        await _dbContext.SaveChangesAsync();
    }
}