namespace Makassed.Api.Repositories.Interfaces;

public interface ISearchRepository
{
    Task<List<T>> SearchEntityAsync<T>(string query, bool isManager) where T : class;
}