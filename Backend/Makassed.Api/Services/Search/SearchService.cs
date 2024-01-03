using AutoMapper;
using Makassed.Api.Models.Domain;
using Makassed.Api.Repositories.Interfaces;
using Makassed.Api.Services.Users;
using Makassed.Contracts.Chapter;
using Makassed.Contracts.MonitoringTool;
using Makassed.Contracts.Policy;
using Makassed.Contracts.PolicyDependency;

namespace Makassed.Api.Services.Search;

public class SearchService : ISearchService
{
    private readonly ISearchRepository _searchRepository;
    private readonly IMapper _mapper;
    private readonly IUserService _userService;

    public SearchService(ISearchRepository searchRepository, IMapper mapper, IUserService userService)
    {
        _searchRepository = searchRepository;
        _mapper = mapper;
        _userService = userService;
    }

    /// <summary>
    /// Maps a list of input entities to a queryable list of output entities using AutoMapper.
    /// </summary>
    /// <typeparam name="TInput">The type of input entities.</typeparam>
    /// <typeparam name="TOutput">The type of output entities.</typeparam>
    /// <param name="inputList">The list of input entities to be mapped.</param>
    /// <returns>An IQueryable of objects representing the mapped output entities.</returns>
    private IQueryable<object> MapAndQuery<TInput, TOutput>(List<TInput> inputList)
    {
        return _mapper.Map<List<TOutput>>(inputList).Cast<object>().AsQueryable();
    }

    /// <summary>
    /// Searches for entities based on the provided query, taking into account the user's role.
    /// </summary>
    /// <param name="query">The search query.</param>
    /// <returns>A list of objects representing the search results.</returns>
    public async Task<List<object>> Search(string query)
    {
        var userRole = await _userService.GetUserRoleAsync();

        // Check user role to include or exclude monitoring tools in the search.
        IQueryable<object> monitoringTools = 
            userRole == "Admin" || userRole == "Sub-Admin"
            ? MapAndQuery<MonitoringTool, GetMonitoringToolResponse>(
                await _searchRepository.SearchEntityAsync<MonitoringTool>(query)
            )
            : Enumerable.Empty<object>().AsQueryable();

        // Search for other entity types.
        var chapters = MapAndQuery<Chapter, GetChapterResponse>(
            await _searchRepository.SearchEntityAsync<Chapter>(query)
        );

        var policies = MapAndQuery<Policy, GetPolicyResponse>(
            await _searchRepository.SearchEntityAsync<Policy>(query)
        );

        var dependencies = MapAndQuery<Dependency, GetPolicyDependencyResponse>(
            await _searchRepository.SearchEntityAsync<Dependency>(query)
        );

        // Combine the search results from different entity types.
        var results = new[] { chapters, policies, dependencies, monitoringTools }.SelectMany(r => r);

        return results.ToList();
    }
}