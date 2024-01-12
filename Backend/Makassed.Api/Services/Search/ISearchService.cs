namespace Makassed.Api.Services.Search;

public interface ISearchService
{
    Task<List<object>> Search(string query);
}
