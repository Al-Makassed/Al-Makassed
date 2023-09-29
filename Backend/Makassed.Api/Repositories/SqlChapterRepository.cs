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

        public async Task<Chapter?> GetChapterByNameAsync(string name)
        {
            return await _dbContext.Chapters.FirstOrDefaultAsync(ch => ch.Name == name);
        }

        public  async Task<List<Chapter>> GetChaptersAsync()
        {
            return await _dbContext.Chapters.Include(ch => ch.Policies).ToListAsync();
        }

        public async Task<Chapter?> GetChapterByIdAsync(Guid id)
        {
            return await _dbContext.Chapters.FindAsync(id);
        }

        public async Task CreateChapterAsync(Chapter chapter)
        {
            await _dbContext.Chapters.AddAsync(chapter);
            chapter.State = false;

            await _dbContext.SaveChangesAsync();
        }
    }
}
