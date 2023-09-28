using Makassed.Api.Models;

namespace Makassed.Api.Repositories
{
    public interface IChapterRepository
    {
        Task<Chapter?> GetChapterByName(string name);
    }
}
