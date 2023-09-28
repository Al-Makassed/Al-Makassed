using Makassed.Api.Data;
using Makassed.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Makassed.Api.Repositories
{
    public class SqlChapterRepository : IChapterRepository
    {
        private readonly MakassedDbContext _dbContext;

        public SqlChapterRepository(MakassedDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<Chapter?> GetChapterByName(string name)
        {
            return await _dbContext.Chapters.FirstOrDefaultAsync(ch => ch.Name == name);
        }
    }
}
