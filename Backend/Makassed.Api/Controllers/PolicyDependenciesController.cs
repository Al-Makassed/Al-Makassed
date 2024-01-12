using AutoMapper;
using Makassed.Api.Models.Domain;
using Makassed.Api.Services.PolicyDependencies;
using Makassed.Contracts.Enums;
using Makassed.Contracts.PolicyDependency;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sieve.Models;

namespace Makassed.Api.Controllers;

[Route("api/chapters/{chapterId:guid}/policies/{policyId:guid}/policy-dependencies")]
public class PolicyDependenciesController : ApiController
{
    private readonly IMapper _mapper;
    private readonly IPolicyDependencyService _policyDependencyService;

    public PolicyDependenciesController(IMapper mapper, IPolicyDependencyService policyDependencyService)
    {
        _mapper = mapper;
        _policyDependencyService = policyDependencyService;
    }


    // Get Policy's Dependencies
    [Authorize]
    [ProducesResponseType(typeof(List<GetPolicyDependencyResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [HttpGet]
    public async Task<IActionResult> GetPoliciesDependencies(Guid chapterId, Guid policyId, [FromQuery] SieveModel sieveModel)
    {
        var policyDependenciesResult = await _policyDependencyService.GetPolicyDependenciesAsync(chapterId, policyId, sieveModel);

        return policyDependenciesResult.Match(
            policyDependencies => Ok(_mapper.Map<List<GetPolicyDependencyResponse>>(policyDependencies)),
            errors => Problem(errors)
        );
    }


    // Get policy dependency by ID
    [Authorize]
    [ProducesResponseType(typeof(GetPolicyDependencyResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetPolicyDependency(Guid policyId, Guid id)
    {
        var policyDependencyResult =  await _policyDependencyService.GetPolicyDependencyByIdAsync(policyId, id);

        return policyDependencyResult.Match(
            policyDependency => Ok(_mapper.Map<GetPolicyDependencyResponse>(policyDependency)),
            errors => Problem(errors)
        );
    }


    // Add policy dependency
    [Authorize(Roles = "Admin, Sub-Admin")]
    [HttpPost]
    [ProducesResponseType(typeof(GetPolicyDependencyResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreatePolicyDependency([FromForm] CreatePolicyDependencyRequest request,
        Guid policyId, Guid chapterId)
    {
        var policyDependency= _mapper.Map<Dependency>(request);

        var policyDependencyCreationResult =
            await _policyDependencyService.CreatePolicyDependencyAsync(policyDependency, policyId, chapterId);

        return policyDependencyCreationResult.Match(
            dependency => CreatedAtAction(
                nameof(GetPolicyDependency),
                new { id = dependency.Id, policyId = dependency.PolicyId, chapterId },
                _mapper.Map<GetPolicyDependencyResponse>(dependency)
            ),
            errors => Problem(errors)
        );
    }


    // Delete policy dependency by ID
    [Authorize(Roles = "Admin, Sub-Admin")]
    [HttpDelete("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeletePolicyDependency(Guid policyId, Guid id)
    {
        var policyDependencyDeletionResult = await _policyDependencyService.DeletePolicyDependencyAsync(policyId, id);
        
        return policyDependencyDeletionResult.Match(
            _ => NoContent(),
            errors => Problem(errors)
        );
    }


    //Delete all policy dependencies
    [Authorize(Roles = "Admin, Sub-Admin")]
    [HttpDelete]
    [ProducesResponseType(typeof(GetPolicyDependencyResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteAllPolicyDependencyOfType(PolicyDependencyType type, Guid policyId)
    {
        var policyDependenciesDeletionResult= await _policyDependencyService.DeleteAllPolicyDependencyTypeAsync(type, policyId);
        
        return policyDependenciesDeletionResult.Match(
            _ => Ok(_mapper.Map<List<GetPolicyDependencyResponse>>(policyDependenciesDeletionResult.Value)),
            errors => Problem(errors)
        );
    }


    // Update policy dependency by ID
    [Authorize(Roles = "Admin, Sub-Admin")]
    [HttpPut("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdatePolicyDependency(Guid policyId, Guid id, [FromForm] UpdatePolicyDependencyRequest request)
    {
        var updateResponse = await _policyDependencyService.UpdatePolicyDependencyAsync(policyId, id, _mapper.Map<Dependency>(request));

        return updateResponse.Match(
            _ => NoContent(),
            errors => Problem(errors)
        );
    }
}