using ErrorOr;
using Makassed.Api.Models.Domain;
using Makassed.Api.Repositories;
using Makassed.Api.ServiceErrors;
using Sieve.Models;

namespace Makassed.Api.Services.Chapters;

public class ChapterService : IChapterService
{
    private readonly IChapterRepository _chapterRepository;

    public ChapterService(IChapterRepository chapterRepository)
    {
        _chapterRepository = chapterRepository;
    }

    public async Task<List<Chapter>> GetChaptersAsync(SieveModel sieveModel)
    {
        return await _chapterRepository.GetChaptersAsync(sieveModel);
    }

    public async Task<ErrorOr<Chapter>> GetChapterByIdAsync(Guid id)
    {
        var chapter = await _chapterRepository.GetChapterByIdAsync(id);

        return chapter is null ? Errors.Chapter.NotFound : chapter;
    }

    public async Task<bool> IsUniqueName(string name)
    {
        var chapter = await _chapterRepository.GetChapterByNameAsync(name);

        return chapter is null;
    }

    public async Task<ErrorOr<Created>> CreateChapterAsync(Chapter chapter)
    {
        if (!await IsUniqueName(chapter.Name))
            return Errors.Chapter.ChapterNameExists;
            
        await _chapterRepository.CreateChapterAsync(chapter);
            
        return Result.Created;
    }

    public async Task<ErrorOr<Deleted>> DeleteChapterAsync(Guid id)
    {
        var deletedChapter = await _chapterRepository.DeleteChapterAsync(id);
            
        return deletedChapter is null ? Errors.Chapter.NotFound : Result.Deleted;
    }

    public async Task<ErrorOr<Updated>> UpdateChapterAsync(Guid id, Chapter chapter)
    {
        if (!await IsUniqueName(chapter.Name))
            return Errors.Chapter.ChapterNameExists;

        var updatedChapter = await _chapterRepository.UpdateChapterAsync(id, chapter);

        if (updatedChapter is null)
            return Errors.Chapter.NotFound;
            
        return Result.Updated;
    }
}