using Makassed.Api.Data;
using Makassed.Api.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace Makassed.Api.Repositories
{
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

        public async Task CreatePolicyAsync(Policy policy)
        {
            await _dbContext.Policies.AddAsync(policy);

            await _dbContext.SaveChangesAsync();
        }

        
        public async Task<bool> CreatePolicyAsync(Policy policy, List<Dependency> dependencies)
        {
            await using var transaction = await _dbContext.Database.BeginTransactionAsync();

            try
            {
                await _dbContext.Policies.AddAsync(policy);

                // await _dbContext.Dependencies.AddRangeAsync(dependencies);

                await _dbContext.SaveChangesAsync();
                await transaction.CommitAsync();

                return true;
            }
            catch
            {
                await transaction.RollbackAsync();
                return false;
            }
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
            var existedPolicy = await _dbContext.Policies.FindAsync(code);
            
            if (existedPolicy is null)
                return null;
            
            existedPolicy.Name = policy.Name;
            existedPolicy.MainFile = policy.MainFile;
            existedPolicy.Dependencies = policy.Dependencies;
            
            await _dbContext.SaveChangesAsync();

            return existedPolicy;
        }
    }
}
