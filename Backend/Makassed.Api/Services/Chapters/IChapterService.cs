using ErrorOr;
using Makassed.Api.Models;
using Makassed.Api.Models.Domain;

namespace Makassed.Api.Services.Chapters
{
    public interface IChapterService
    {
        Task<bool> IsUniqueName(string name);
        Task<List<Chapter>> GetChaptersAsync();
        Task<ErrorOr<Chapter>> GetChapterByIdAsync(Guid id);
        Task<ErrorOr<Created>> CreateChapterAsync(Chapter chapter);
        Task<ErrorOr<Deleted>> DeleteChapterAsync(Guid id);
        Task<ErrorOr<Updated>> UpdateChapterAsync(Guid id, Chapter chapter);
    }
}
