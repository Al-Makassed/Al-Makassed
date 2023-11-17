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

    public async Task<List<Dependency>> GetPolicyDependenciesAsync(Guid policyId, string? filterOn, string? filterQuery)
    {
        var policyDependencies = _dbContext.Dependencies.Where(d => d.PolicyId == policyId);

        // Filtering
        if (!string.IsNullOrWhiteSpace(filterOn) && !string.IsNullOrWhiteSpace(filterQuery))
        {
            if (filterOn.Equals("Type", StringComparison.OrdinalIgnoreCase) ||
                filterOn.Equals("PolicyDependencyType", StringComparison.OrdinalIgnoreCase))
            {
                policyDependencies = policyDependencies.Where(d =>
                    d.PolicyDependencyType == (PolicyDependencyType)int.Parse(filterQuery));
            }
        }

        return await policyDependencies.ToListAsync();
    }

    public async Task<Dependency?> GetPolicyDependencyByIdAsync(Guid id)
    {
        return await _dbContext.Dependencies.FirstOrDefaultAsync(d => d.Id == id);
    }
    
    public async Task CreatePolicyDependencyAsync(Dependency policyDependency)
    {
        await _dbContext.Dependencies.AddAsync(policyDependency);
        await _dbContext.SaveChangesAsync();
    }
    
    public async Task<Dependency?> DeletePolicyDependencyAsync(Guid id)
    {
        var policyDependencyToDelete = await _dbContext.Dependencies.FirstOrDefaultAsync(d => d.Id == id);

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

    public async Task<Dependency?> UpdatePolicyDependencyAsync(Guid id, Dependency policyDependency)
    {
        var existedPolicyDependency = await _dbContext.Dependencies.FirstOrDefaultAsync(d => d.Id == id);

        if (existedPolicyDependency is null)
            return null;

        existedPolicyDependency.Code = policyDependency.Code;
        existedPolicyDependency.Name = policyDependency.Name;
        existedPolicyDependency.PdfUrl = policyDependency.PdfUrl;
        existedPolicyDependency.PagesCount = policyDependency.PagesCount;
        existedPolicyDependency.EstimatedTimeInMin = policyDependency.EstimatedTimeInMin;
        
        await _dbContext.SaveChangesAsync();

        return existedPolicyDependency;
    }
}
