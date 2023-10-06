using Makassed.Api.Data;
using Makassed.Api.Models.Domain;
using Microsoft.EntityFrameworkCore;

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
}