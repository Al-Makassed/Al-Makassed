using ErrorOr;
using Makassed.Api.Models;
using Makassed.Api.Repositories;
using Makassed.Api.ServiceErrors;

namespace Makassed.Api.Services.Chapters
{
    public class ChapterService : IChapterService
    {
        private readonly IChapterRepository _chapterRepository;

        public ChapterService(IChapterRepository chapterRepository)
        {
            _chapterRepository = chapterRepository;
        }

        public async Task<bool> IsUniqueName(string name)
        {
            var chapter = await _chapterRepository.GetChapterByName(name);

            return chapter is null;
        }

        public async Task<List<Chapter>> GetChaptersAsync()
        {
            return await _chapterRepository.GetChaptersAsync();
        }

        public async Task<ErrorOr<Chapter>> GetChapterByIdAsync(Guid id)
        {
            var chapter = await _chapterRepository.GetChapterByIdAsync(id);

            if (chapter is not null)
                return chapter;

            return Errors.Chapter.NotFound;
        }

        public async Task<ErrorOr<Created>> CreateChapterAsync(Chapter chapter)
        {
            await _chapterRepository.CreateChapterAsync(chapter);
            return Result.Created;
        }
    }
}
