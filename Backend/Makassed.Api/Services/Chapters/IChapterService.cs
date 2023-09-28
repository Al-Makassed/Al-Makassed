using ErrorOr;
using Makassed.Api.Models;

namespace Makassed.Api.Services.Chapters
{
    public interface IChapterService
    {
        Task<bool> IsUniqueName(string name);
        Task<List<Chapter>> GetChaptersAsync();
        Task<ErrorOr<Chapter>> GetChapterByIdAsync(Guid id);
        Task<ErrorOr<Created>> CreateChapterAsync(Chapter chapter);
    }
}
