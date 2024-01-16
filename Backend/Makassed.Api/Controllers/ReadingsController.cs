using AutoMapper;
using Makassed.Api.Services.FilesReading;
using Makassed.Contracts.Readings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Sieve.Models;

namespace Makassed.Api.Controllers;
[Route("api/[controller]")]
public class ReadingsController : ApiController
{
    private readonly IFilesReadingService _filesReadingService;
    private readonly IMapper _mapper;

    public ReadingsController(IFilesReadingService filesReadingService, IMapper mapper)
    {
        _filesReadingService = filesReadingService;
        _mapper = mapper;
    }

    // finish policy file reading
    [Authorize]
    [HttpPost("policies/{id:guid}/finish-reading")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> FinishReadingPolicyFile(Guid id)
    {
        var result = await _filesReadingService.FinishReadingPolicyFile(id);

        return result.Match(
            _ => NoContent(),
            Problem
        );
    }

    // Get the percentage of the policies read by user over all policies with using sieve model
    [Authorize]
    [HttpGet("policies/percentage")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetPoliciesPercentage([FromQuery] SieveModel sieveModel)
    {
        var result = await _filesReadingService.GetReadPoliciesPercentage(sieveModel);

        return result.Match(
            Ok,
            Problem
        );
    }

    // Get finished policies
    [Authorize]
    [HttpGet("policies/finished")]
    [ProducesResponseType(typeof(List<GetPolicyReadingsResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetFinishedPolicies([FromQuery] SieveModel sieveModel)
    {
        var result = await _filesReadingService.GetFinishedPolicies(sieveModel);

        return result.Match(
            result => Ok(_mapper.Map<List<GetPolicyReadingsResponse>>(result)),
            Problem
        );
    }

    [Authorize]
    [HttpPost("dependencies/{id:guid}/finish-reading")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> FinishReadingDependencyFile(Guid id)
    {
        var result = await _filesReadingService.FinishReadingDependencyFile(id);

        return result.Match(
            _ => NoContent(),
            Problem
        );
    }

    // Get the percentage of the dependencies read by user over all dependencies with using sieve model
    [Authorize]
    [HttpGet("dependencies/percentage")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetDependenciesPercentage([FromQuery] SieveModel sieveModel)
    {
        var result = await _filesReadingService.GetReadDependenciesPercentage(sieveModel);

        return result.Match(
            Ok,
            Problem
        );
    }

    // Get finished dependencies
    [Authorize]
    [HttpGet("dependencies/finished")]
    [ProducesResponseType(typeof(List<GetDependencyReadingsResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetFinishedDependencies([FromQuery] SieveModel sieveModel)
    {
        var result = await _filesReadingService.GetFinishedDependencies(sieveModel);

        return result.Match(
            result => Ok(_mapper.Map<List<GetDependencyReadingsResponse>>(result)),
            Problem
        );
    }
}
