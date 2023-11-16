using Makassed.Api.Data;
using Makassed.Api.Models.Domain;
using Makassed.Contracts.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Makassed.Api.Repositories;

public class SqlPolicyDependencyRepository : IPolicyDependencyRepository
{
    private readonly MakassedDbContext _dbContext;

    public SqlPolicyDependencyRepository(MakassedDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Dependency>> GetPolicyDependenciesAsync(string? filterOn, string? filterQuery)
    {
        var policyDependencies = _dbContext.Dependencies.AsQueryable();

        // Filtering
        if (string.IsNullOrWhiteSpace(filterOn) == false && string.IsNullOrWhiteSpace(filterQuery) == false)
        {
            //if (filterOn.Equals("PolicyCode", StringComparison.OrdinalIgnoreCase))
                //policyDependencies = policyDependencies.Where(w => w.PolicyId);
        }

        return await policyDependencies.ToListAsync();
    }

    public async Task<Dependency?> GetPolicyDependencyByCodeAsync(string code)
    {
        return await _dbContext.Dependencies.FirstOrDefaultAsync(d => d.Code == code);
    }
    
    public async Task CreatePolicyDependencyAsync(Dependency policyDependency)
    {
        await _dbContext.Dependencies.AddAsync(policyDependency);
        await _dbContext.SaveChangesAsync();
    }
    
    public async Task<Dependency?> DeletePolicyDependencyAsync(string code)
    {
        var policyDependencyToDelete = await _dbContext.Dependencies.FirstOrDefaultAsync(d => d.Code == code);

        if (policyDependencyToDelete is null)
            return null;

        _dbContext.Dependencies.Remove(policyDependencyToDelete);
        await _dbContext.SaveChangesAsync();

        return policyDependencyToDelete;
    }

    public async Task<List<Dependency>?> DeleteAllPolicyDependencyTypeAsync(PolicyDependencyType type, Guid policyId)
    {
        var policyDependencies = await _dbContext.Dependencies.Where(d => d.PolicyId == policyId && d.PolicyDependencyType == type).ToListAsync();

        if (policyDependencies.IsNullOrEmpty())
            return null;

        _dbContext.Dependencies.RemoveRange(policyDependencies);
        await _dbContext.SaveChangesAsync();
        
        return policyDependencies;
    }

    public async Task<Dependency?> UpdatePolicyDependencyAsync(string code, Dependency policyDependency)
    {
        var existedPolicyDependency = await _dbContext.Dependencies.FirstOrDefaultAsync(d => d.Code == code);

        if (existedPolicyDependency is null)
            return null;
        
        existedPolicyDependency.PdfUrl = policyDependency.PdfUrl;
        existedPolicyDependency.PagesCount = policyDependency.PagesCount;
        existedPolicyDependency.EstimatedTimeInMin = policyDependency.EstimatedTimeInMin;
        
        if (!existedPolicyDependency.Code.Equals(policyDependency.Code))
        {
            await UpdatePolicyDependencyCodeAsync(existedPolicyDependency.Code, policyDependency.Code);
            existedPolicyDependency.Name = policyDependency.Name;
        }
        
        await _dbContext.SaveChangesAsync();

        return existedPolicyDependency;
    }

    private async Task UpdatePolicyDependencyCodeAsync(string oldPolicyDependencyCode, string newPolicyDependencyCode)
    {
        var existedPolicyDependency = await _dbContext.Dependencies.FirstOrDefaultAsync(d => d.Code == oldPolicyDependencyCode);

        if (existedPolicyDependency == null)
            return;

        var newPolicyDependency = existedPolicyDependency;
        newPolicyDependency.Code = newPolicyDependencyCode;

        await CreatePolicyDependencyAsync(newPolicyDependency);

        await DeletePolicyDependencyAsync(oldPolicyDependencyCode);

        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdatePoliciesDependenciesCodesAsync(Guid policyId, List<string> newCodes, List<string> oldCodes)
    {
        var existedPolicyDependencies = await _dbContext.Dependencies.Where(d => d.PolicyId == policyId).ToListAsync();
        
        if (existedPolicyDependencies.IsNullOrEmpty())
            return;

        for (var i = 0; i < existedPolicyDependencies.Count; i++)
        {
            existedPolicyDependencies[i].Code = newCodes[i];
        }
        
        await _dbContext.Dependencies.AddRangeAsync(existedPolicyDependencies);
        await _dbContext.SaveChangesAsync();

        var oldPolicyDependencies = await _dbContext.Dependencies.Where(d => oldCodes.Contains(d.Code)).ToListAsync();
        
        _dbContext.Dependencies.RemoveRange(oldPolicyDependencies);
        await _dbContext.SaveChangesAsync();
    }
}
