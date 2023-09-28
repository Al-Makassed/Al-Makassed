using Makassed.Api.Models;

namespace Makassed.Api.Repositories
{
    public interface IChapterRepository
    {
        Task<Chapter?> GetChapterByName(string name);
        Task<List<Chapter>> GetChaptersAsync();
        Task<Chapter?> GetChapterByIdAsync(Guid id);
        Task CreateChapterAsync(Chapter chapter);
    }
}
