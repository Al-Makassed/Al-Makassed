using ErrorOr;
using Makassed.Api.Models.Domain;
using Makassed.Api.Repositories;
using Makassed.Api.ServiceErrors;
using Makassed.Api.Services.Policies;

namespace Makassed.Api.Services.Chapters;

public class ChapterService : IChapterService
{
    private readonly IChapterRepository _chapterRepository;
    private readonly IPolicyRepository _policyRepository;
    private readonly IPolicyService _policyService;

    public ChapterService(IChapterRepository chapterRepository, IPolicyRepository policyRepository, IPolicyService policyService)
    {
        _chapterRepository = chapterRepository;
        _policyRepository = policyRepository;
        _policyService = policyService;
    }

    public async Task<List<Chapter>> GetChaptersAsync()
    {
        return await _chapterRepository.GetChaptersAsync();
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

    private async Task<Chapter> AddExistedPolicies(Chapter chapter, IEnumerable<string> policiesCodes)
    {
        var validPolicies = await _policyRepository.FindValidPoliciesAsync(policiesCodes);

        chapter.Policies = validPolicies;

        return chapter;
    }

    public async Task<ErrorOr<Updated>> UpdateChapterAsync(Guid id, Chapter chapter, IEnumerable<string> policiesCodes)
    {
        chapter = await AddExistedPolicies(chapter, policiesCodes);
            
        var updatedChapter = await _chapterRepository.UpdateChapterAsync(id, chapter);

        if (updatedChapter is null)
            return Errors.Chapter.NotFound;
        
        await _policyService.EditChapterPoliciesCodesAsync(id, chapter.Name);
            
        return Result.Updated;
    }
}