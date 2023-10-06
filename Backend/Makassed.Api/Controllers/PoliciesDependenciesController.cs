using AutoMapper;
using Makassed.Api.Models.Domain;
using Makassed.Api.Services.PolicyDependencies;
using Makassed.Contracts.PolicyDependency;
using Microsoft.AspNetCore.Mvc;

namespace Makassed.Api.Controllers;
public class PoliciesDependenciesController : ApiController
{
    private readonly IMapper _mapper;
    private readonly IPolicyDependencyService _policyDependencyService;

    public PoliciesDependenciesController(IMapper mapper, IPolicyDependencyService policyDependencyService)
    {
        _mapper = mapper;
        _policyDependencyService = policyDependencyService;
    }


    // Get Policies Dependencies
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [HttpGet]
    public async Task<IActionResult> GetPoliciesDependencies([FromQuery] string? filterOn,
        [FromQuery] string? filterQuery)
    {
        List<Dependency> policyDependencies =
            await _policyDependencyService.GetPolicyDependenciesAsync(filterOn, filterQuery);

        return Ok(_mapper.Map<List<GetPolicyDependencyResponse>>(policyDependencies));
    }


    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreatePolicyDependency(List<CreatePolicyDependencyRequest> request,
        string policyCode)
    {
        var policyDependencies = _mapper.Map<List<Dependency>>(request);

        var policyDependencyCreationResult =
            await _policyDependencyService.CreatePolicyDependenciesAsync(policyDependencies, policyCode);

        return policyDependencyCreationResult.Match(
            dependencies => CreatedAtAction(
                nameof(GetPoliciesDependencies),
                new { filterOn = "PolicyCode", filterQuery = policyCode },
                _mapper.Map<List<Dependency>>(dependencies)
            ),
            errors => Problem(errors)
        );
    }
}