using Makassed.Api.Models.Domain;
using Sieve.Models;

namespace Makassed.Api.Repositories;

public interface IChapterRepository
{
    Task<Chapter?> GetChapterByNameAsync(string name);
        
    Task<List<Chapter>> GetChaptersAsync(SieveModel sieveModel);
        
    Task<Chapter?> GetChapterByIdAsync(Guid id);
        
    Task CreateChapterAsync(Chapter chapter);
        
    Task<Chapter?> DeleteChapterAsync(Guid id);
        
    Task<Chapter?> UpdateChapterAsync(Guid id, Chapter chapter);
        
    Task UpdateChapterEnableStateAsync(Guid id);
}