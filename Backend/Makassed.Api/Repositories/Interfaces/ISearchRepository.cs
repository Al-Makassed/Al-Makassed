namespace Makassed.Api.Repositories.Interfaces;

public interface ISearchRepository
{
    Task<List<T>> SearchEntityAsync<T>(string query) where T : class;
}