using Makassed.Api.Data;
using Makassed.Api.Models;
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
    }
}
