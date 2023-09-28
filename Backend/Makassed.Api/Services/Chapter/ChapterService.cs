using Makassed.Api.Repositories;
using System.Runtime.CompilerServices;

namespace Makassed.Api.Services.Chapter
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

            if (chapter is null)
                return true;

            return false;
        }
    }
}
