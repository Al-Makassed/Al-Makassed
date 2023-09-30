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
            chapter.EnableState = false;

            await _dbContext.SaveChangesAsync();
        }

        public async Task<Chapter?> DeleteChapterAsync(Guid id)
        {
            var chapter = await _dbContext.Chapters.FindAsync(id);
            
            if (chapter is null)
                return null;
            
            _dbContext.Chapters.Remove(chapter);
            await _dbContext.SaveChangesAsync();

            return chapter;
        }

        public async Task<Chapter?> UpdateChapterAsync(Guid id, Chapter chapter)
        {
            var existedChapter = await _dbContext.Chapters.FindAsync(id);
            
            if (existedChapter is null)
                return null;
            
            existedChapter.Name = chapter.Name;
            existedChapter.Policies = chapter.Policies;
            existedChapter.EnableState = chapter.Policies.Count > 0;
            
            await _dbContext.SaveChangesAsync();

            return existedChapter;
        }
    }
}
