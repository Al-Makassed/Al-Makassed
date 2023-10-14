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

    public async Task CreatePolicyDependenciesAsync(List<Dependency> policyDependencies)
    {
        await _dbContext.Dependencies.AddRangeAsync(policyDependencies);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<List<Dependency>> GetPolicyDependenciesAsync(string? filterOn, string? filterQuery)
    {
        var policyDependencies = _dbContext.Dependencies.AsQueryable();

        // Filtering
        if (string.IsNullOrWhiteSpace(filterOn) == false && string.IsNullOrWhiteSpace(filterQuery) == false)
        {
            if (filterOn.Equals("PolicyCode", StringComparison.OrdinalIgnoreCase))
                policyDependencies = policyDependencies.Where(w => w.PolicyCode.Contains(filterQuery));
        }

        return await policyDependencies.ToListAsync();
    }

    public async Task<Dependency?> GetPolicyDependencyByCodeAsync(string code)
    {
        return await _dbContext.Dependencies.FirstOrDefaultAsync(d => d.Code == code);
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

    public async Task<List<Dependency>?> DeleteAllPolicyDependencyTypeAsync(PolicyDependencyType type, string policyCode)
    {
        var policyDependencies = await _dbContext.Dependencies.Where(d => d.PolicyCode == policyCode && d.PolicyDependencyType == type).ToListAsync();

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

        existedPolicyDependency.Name = policyDependency.Name;
        existedPolicyDependency.PdfUrl = policyDependency.PdfUrl;
        existedPolicyDependency.PagesCount = policyDependency.PagesCount;
        existedPolicyDependency.EstimatedTime = policyDependency.EstimatedTime;
        
        await _dbContext.SaveChangesAsync();

        return existedPolicyDependency;
    }
}