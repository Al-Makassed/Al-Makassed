﻿using AutoMapper;
using Makassed.Api.Models.Domain;
using Makassed.Api.Services.PolicyDependencies;
using Makassed.Contracts.Enums;
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
    
    // Get policy dependency by code
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [HttpGet("{code}")]
    public async Task<IActionResult> GetPolicyDependency(string code)
    {
        var policyDependency =
            await _policyDependencyService.GetPolicyDependencyByCodeAsync(code);

        return Ok(_mapper.Map<GetPolicyDependencyResponse>(policyDependency));
    }

    // Add list of policy dependencies
    [HttpPost("multiple")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreatePolicyDependencies([FromForm]List<CreatePolicyDependencyRequest> request,
        string policyCode)
    {
        var policyDependencies = _mapper.Map<List<Dependency>>(request);

        var policyDependencyCreationResult =
            await _policyDependencyService.CreatePolicyDependenciesAsync(policyDependencies, policyCode);

        return policyDependencyCreationResult.Match(
            _ => CreatedAtAction(
                nameof(GetPoliciesDependencies),
                new { filterOn = "PolicyCode", filterQuery = policyCode },
                _mapper.Map<List<GetPolicyDependencyResponse>>(policyDependencyCreationResult)
            ),
            errors => Problem(errors)
        );
    }
    
    // Add policy dependency
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreatePolicyDependency([FromForm] CreatePolicyDependencyRequest request,
        string policyCode)
    {
        var policyDependency= _mapper.Map<Dependency>(request);

        var policyDependencyCreationResult =
            await _policyDependencyService.CreatePolicyDependencyAsync(policyDependency, policyCode);

        return policyDependencyCreationResult.Match(
            _ => CreatedAtAction(
                nameof(GetPolicyDependency),
                new { code = policyDependencyCreationResult.Value.Code },
                _mapper.Map<GetPolicyDependencyResponse>(policyDependencyCreationResult.Value)
            ),
            errors => Problem(errors)
        );
    }
    
    
    // Delete policy dependency by code
    [HttpDelete("{code}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeletePolicyDependency(string code)
    {
        var policyDependencyDeletionResult = await _policyDependencyService.DeletePolicyDependencyAsync(code);
        
        return policyDependencyDeletionResult.Match(
            _ => NoContent(),
            errors => Problem(errors)
        );
    } 
    
    
    //Delete all policy dependencies
    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteAllPolicyDependencyType(PolicyDependencyType type, string policyCode)
    {
        var policyDependenciesDeletionResult= await _policyDependencyService.DeleteAllPolicyDependencyTypeAsync(type, policyCode);
        
        return policyDependenciesDeletionResult.Match(
            _ => Ok(_mapper.Map<List<GetPolicyDependencyResponse>>(policyDependenciesDeletionResult.Value)),
            errors => Problem(errors)
        );
    }
    
    
    // Update policy dependency by code
    [HttpPut("{code}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdatePolicyDependency(string code, [FromForm] UpdatePolicyDependencyRequest request)
    {
        var updateResponse = await _policyDependencyService.UpdatePolicyDependencyAsync(code, _mapper.Map<Dependency>(request));

        return updateResponse.Match(
            _ => NoContent(),
            errors => Problem(errors)
        );
    }

}