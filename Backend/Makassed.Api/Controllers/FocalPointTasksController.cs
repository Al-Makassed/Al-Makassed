using AutoMapper;
using Makassed.Api.Models.DTO;
using Makassed.Api.Services.FocalPointTasks;
using Makassed.Contracts.MonitoringTool.FocalPointTasks;
using Makassed.Contracts.MonitoringTool.FocalPointTasks.Submissions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Makassed.Api.Controllers;
[Route("api/focal-point-tasks")]

public class FocalPointTasksController : ApiController
{
    private readonly IMapper _mapper;
    private readonly IFocalPointTaskService _focalPointTaskService;

    public FocalPointTasksController(IMapper mapper, IFocalPointTaskService focalPointTaskService)
    {
        _mapper = mapper;
        _focalPointTaskService = focalPointTaskService;
    }
    
    [HttpGet("departments/{departmentId:Guid}")]
    [ProducesResponseType(typeof(GetAllFocalPointTasksBaseResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize(Roles = "Admin, Sub-Admin, Focal Point")]
    public async Task<IActionResult> GetFocalPointTasks([FromRoute]Guid departmentId)
    {
        var focalPointTasksResult = await _focalPointTaskService.GetFocalPointTasksAsync(departmentId);

        return focalPointTasksResult.Match(
            focalPointTasks => Ok(_mapper.Map<List<GetAllFocalPointTasksBaseResponse>>(focalPointTasks)),
            errors => Problem(errors)
        );
    }

    // Get focal point task by id
    [HttpGet("{id:Guid}/departments/{departmentId:Guid}")]
    [ProducesResponseType(typeof(GetFocalPointTaskResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize(Roles = "Admin, Sub-Admin, Focal Point")]
    public async Task<IActionResult> GetFocalPointTask([FromRoute]Guid departmentId, [FromRoute]Guid id)
    {
        var focalPointTaskResult = await _focalPointTaskService.GetFocalPointTaskByIdAsync(departmentId, id);

        return focalPointTaskResult.Match(
            focalPointTask => Ok(_mapper.Map<GetFocalPointTaskResponse>(focalPointTask)),
            errors => Problem(errors)
        );
    }

    // Submit focal point task
    [HttpPost("{id:Guid}/departments/{departmentId:Guid}/submissions")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize(Roles = "Admin, Sub-Admin, Focal Point")]
    public async Task<IActionResult> SubmitFocalPointTask([FromRoute]Guid departmentId, [FromRoute]Guid id, SubmitFocalPointTaskRequest request)
    {
        var focalPointTaskResult = await _focalPointTaskService.SubmitFocalPointTaskAsync(departmentId, id, _mapper.Map<FieldAnswersDto>(request).Answers);

        return focalPointTaskResult.Match(
            submission => Ok(_mapper.Map<SubmitTaskResponse>(submission)),
            errors => Problem(errors)
        );
    }
}