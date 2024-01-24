using AutoMapper;
using Makassed.Api.Models.Domain;
using Makassed.Api.Services.FilesReading;
using Makassed.Api.Services.Policies;
using Makassed.Contracts.Policy;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sieve.Models;

namespace Makassed.Api.Controllers;

[Route("api/chapters/{chapterId:guid}/[controller]")]
public class PoliciesController : ApiController
{
    private readonly IPolicyService _policyService;
    private readonly IFilesReadingService _filesReadingService;
    private readonly IMapper _mapper;

    public PoliciesController(IPolicyService policyService, IFilesReadingService filesReadingService, IMapper mapper)
    {
        _policyService = policyService;
        _filesReadingService = filesReadingService;
        _mapper = mapper;
    }


    // Get All Policies
    [Authorize]
    [HttpGet]
    [ProducesResponseType(typeof(List<GetPolicyResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetPolicies([FromQuery] SieveModel sieveModel, Guid chapterId)
    {
        var policiesResult = await _policyService.GetPoliciesAsync(sieveModel, chapterId);
        
        return policiesResult.Match(
            policies => Ok(_mapper.Map<List<GetPolicyResponse>>(policies)),
            errors => Problem(errors)
            );
    }


    // Get Policy by ID
    [Authorize]
    [ProducesResponseType(typeof(GetPolicyResponse),StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetPolicy(Guid chapterId, Guid id)
    {
        var getPolicyResult = await _policyService.GetPolicyByIdAsync(chapterId, id);

        return getPolicyResult.Match(
            policy => Ok(_mapper.Map<GetPolicyResponse>(policy)),
            errors => Problem(errors)
        );
    }


    // Create a New Policy
    [Authorize(Roles = "Admin, Sub-Admin")]
    [HttpPost]
    [ProducesResponseType(typeof(GetPolicyResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreatePolicy(Guid chapterId, [FromForm]CreatePolicyRequest request)
    {
        var policy = _mapper.Map<Policy>(request);

        var policyCreationResult = await _policyService.CreatePolicyAsync(chapterId, policy);

        return policyCreationResult.Match(
            _ => CreatedAtAction(
                nameof(GetPolicy), 
                new { chapterID = chapterId, id = policy.Id }, 
                _mapper.Map<GetPolicyResponse>(policy)
            ),
            errors => Problem(errors)
        );
    }


    // Update a policy by id
    [Authorize(Roles = "Admin, Sub-Admin")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdatePolicy(Guid chapterId, Guid id,[FromForm]UpdatePolicyRequest request)
    {
        var policy = _mapper.Map<Policy>(request);

        var updatePolicyResult = await _policyService.UpdatePolicyAsync(chapterId, id, policy);

        return updatePolicyResult.Match(
            _ => NoContent(),
            errors => Problem(errors)
        );
    }

    // Delete a policy by id
    [Authorize(Roles = "Admin, Sub-Admin")]
    [HttpDelete("{id:guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeletePolicy(Guid chapterId, Guid id)
    {
        var deletePolicyResult= await _policyService.DeletePolicyAsync(chapterId, id);
        return deletePolicyResult.Match(
            _ => NoContent(),
            errors => Problem(errors)
        );
    }

    //Delete all policies
    [Authorize(Roles = "Admin, Sub-Admin")]
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteAllChapterPolicies(Guid chapterId)
    {
        var deleteAllPoliciesResult= await _policyService.DeleteAllChapterPoliciesAsync(chapterId);
        
        return deleteAllPoliciesResult.Match(
            _ => Ok(_mapper.Map<List<GetPolicyResponse>>(deleteAllPoliciesResult.Value)),
            errors => Problem(errors)
        );
    }
}