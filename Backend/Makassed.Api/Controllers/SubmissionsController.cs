using AutoMapper;
using Makassed.Api.Services.Submissions;
using Makassed.Contracts.Submission;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sieve.Models;

namespace Makassed.Api.Controllers;

public class SubmissionsController : ApiController
{
    private readonly IMapper _mapper;
    private readonly ISubmissionService _submissionService;

    public SubmissionsController(IMapper mapper, ISubmissionService submissionService)
    {
        _mapper = mapper;
        _submissionService = submissionService;
    }

    // Get all Submissions => will be reworked after monitoring tools analysis is ready
    [HttpGet]
    [ProducesResponseType(typeof(List<GetAllSubmissionBaseResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize(Roles = "Admin, Sub-Admin")]
    public async Task<IActionResult> GetAllUsers([FromQuery] SieveModel sieveModel)
    {
        var submissionsResult = await _submissionService.GetAllSubmissionsAsync(sieveModel);

        return Ok(_mapper.Map<List<GetAllSubmissionBaseResponse>>(submissionsResult));
    }

    // Get Submission by Id
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(GetSubmissionResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize(Roles = "Admin, Sub-Admin, Focal Point")]
    public async Task<IActionResult> GetSubmission(Guid id)
    {
        var submissionResult = await _submissionService.GetSubmissionByIdAsync(id);

        return submissionResult.Match(
            submission => Ok(_mapper.Map<GetSubmissionResponse>(submission)),
            Problem
        );
    }
}
