using Makassed.Api.Data;
using Makassed.Api.Models.Domain;
using Makassed.Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Sieve.Models;
using Sieve.Services;

namespace Makassed.Api.Repositories.Implementations;

public class SqlChapterRepository : IChapterRepository
{
    private readonly MakassedDbContext _dbContext;
    private readonly ISieveProcessor _sieveProcessor;

    public SqlChapterRepository(MakassedDbContext dbContext, ISieveProcessor sieveProcessor)
    {
        _dbContext = dbContext;
        _sieveProcessor = sieveProcessor;
    }
        
    public async Task<Chapter?> GetChapterByNameAsync(string name)
    {
        return await _dbContext.Chapters.FirstOrDefaultAsync(ch => ch.Name == name);
    }
        
    public  async Task<List<Chapter>> GetChaptersAsync(SieveModel sieveModel)
    {
        var chapters = _dbContext.Chapters.Include(ch => ch.Policies).ThenInclude(p => p.Dependencies).AsNoTracking();

        return await _sieveProcessor.Apply(sieveModel, chapters).ToListAsync();
    }

    public async Task<Chapter?> GetChapterByIdAsync(Guid id)
    {
        return await _dbContext.Chapters.Include(ch => ch.Policies).ThenInclude(p => p.Dependencies).FirstOrDefaultAsync(ch => ch.Id == id);
    }

    public async Task CreateChapterAsync(Chapter chapter)
    {
        await _dbContext.Chapters.AddAsync(chapter);
        chapter.EnableState = chapter.Policies.Count > 0;

        await _dbContext.SaveChangesAsync();
    }

    public async Task<Chapter?> UpdateChapterAsync(Guid id, Chapter chapter)
    {
        var existedChapter = await _dbContext.Chapters
            .Include(c => c.Policies)
            .FirstOrDefaultAsync(ch => ch.Id == id);
            
        if (existedChapter is null)
            return null;
            
        existedChapter.Name = chapter.Name;
        existedChapter.EnableState = existedChapter.Policies.Count > 0;
            
        await _dbContext.SaveChangesAsync();

        return existedChapter;
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

    public async Task UpdateChapterEnableStateAsync(Guid id)
    {
        var chapter = await _dbContext.Chapters
            .Include(c => c.Policies)
            .FirstOrDefaultAsync(ch => ch.Id == id);
        
        if (chapter is null)
            return;
        
        chapter.EnableState = chapter.Policies.Count > 0;
    }
}