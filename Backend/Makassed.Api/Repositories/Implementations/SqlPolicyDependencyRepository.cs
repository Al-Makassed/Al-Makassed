using Makassed.Api.Data;
using Makassed.Api.Models.Domain;
using Makassed.Api.Repositories.Interfaces;
using Makassed.Contracts.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Sieve.Models;
using Sieve.Services;

namespace Makassed.Api.Repositories.Implementations;

public class SqlPolicyDependencyRepository : IPolicyDependencyRepository
{
    private readonly MakassedDbContext _dbContext;
    private readonly ISieveProcessor _sieveProcessor;

    public SqlPolicyDependencyRepository(MakassedDbContext dbContext, ISieveProcessor sieveProcessor
        )
    {
        _dbContext = dbContext;
        _sieveProcessor = sieveProcessor;
    }

    public async Task<List<Dependency>> GetPolicyDependenciesAsync(Guid policyId, SieveModel sieveModel)
    {
        var policyDependencies = _dbContext.Dependencies.Where(d => d.PolicyId == policyId).AsNoTracking();

        return await _sieveProcessor.Apply(sieveModel, policyDependencies).ToListAsync();
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
        var policyDependencies = await _dbContext.Dependencies.Where(d => d.PolicyId == policyId && d.Type == type).ToListAsync();

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
