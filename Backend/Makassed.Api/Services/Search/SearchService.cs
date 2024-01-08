using AutoMapper;
using Makassed.Api.Models.Domain;
using Makassed.Api.Repositories.Interfaces;
using Makassed.Api.Services.Users;
using Makassed.Contracts.Search;

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

        bool isManager = userRole is "Admin" or "Sub-Admin";

        // Check user role to include or exclude monitoring tools in the search.
        IQueryable<object> monitoringTools =
            userRole is "Admin" or "Sub-Admin"
            ? MapAndQuery<MonitoringTool, MonitoringToolSearchResponse>(
                await _searchRepository.SearchEntityAsync<MonitoringTool>(query, isManager)
            )
            : Enumerable.Empty<object>().AsQueryable();

        // Check user role to include or exclude focal point tasks in the search.
        IQueryable<object> tasks =
            userRole == "Focal Point"
            ? MapAndQuery<FocalPointTask, FpTaskSearchResponse>(
                await SearchFpTasks(query)
            )
            : Enumerable.Empty<object>().AsQueryable();

        // Search for other entity types.
        var chapters = MapAndQuery<Chapter, ChapterSearchResponse>(
            await _searchRepository.SearchEntityAsync<Chapter>(query, isManager)
        );

        var policies = MapAndQuery<Policy, PolicySearchResponse>(
            await _searchRepository.SearchEntityAsync<Policy>(query, isManager)
        );

        var dependencies = MapAndQuery<Dependency, DependencySearchResponse>(
            await _searchRepository.SearchEntityAsync<Dependency>(query, isManager)
        );

        // Combine the search results from different entity types.
        var results = new[] { chapters, policies, dependencies, monitoringTools, tasks }.SelectMany(r => r);

        return results.ToList();
    }
    
    // Perform a search for Focal Point Tasks based on the provided query and department.
    private async Task<List<FocalPointTask>> SearchFpTasks(string query)
    {
        var userDepartmentId = await _userService.GetUserDepartmentIdAsync();

        var result = await _searchRepository.SearchEntityAsync<FocalPointTask>(query, false);

        return result.Where(f => f.Department.Id == userDepartmentId.Value).ToList();
    }
}
