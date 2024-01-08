using Makassed.Api.Services.Search;
using Microsoft.AspNetCore.Mvc;

namespace Makassed.Api.Controllers;
[Route("api/[controller]")]
public class SearchController : ApiController
{
    private readonly ISearchService _searchService;
    public SearchController(ISearchService searchService)
    {
        _searchService = searchService;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<List<object>>> Search([FromQuery] string query)
    {
        var results = await _searchService.Search(query);

        return Ok(results);
    }
}
