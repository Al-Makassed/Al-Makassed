using AutoMapper;
using Makassed.Api.Models.Domain;
using Makassed.Api.Models.DTO;
using Makassed.Api.Services.MonitoringTools.FocalPointTasks;
using Makassed.Api.Services.Users.Departments;
using Makassed.Contracts.MonitoringTool.FocalPointTasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Makassed.Api.Controllers;
[Route("api/departments/{departmentId}/focal-point-task")]

public class FocalPointTasksController : ApiController
{
    private readonly IDepartmentService _departmentService;
    private readonly IMapper _mapper;
    private readonly IFocalPointTaskService _focalPointTaskService;

    public FocalPointTasksController(IDepartmentService departmentService, IMapper mapper, IFocalPointTaskService focalPointTaskService)
    {
        _departmentService = departmentService;
        _mapper = mapper;
        _focalPointTaskService = focalPointTaskService;
    }
    
    [HttpGet]
    [ProducesResponseType(typeof(GetAllFocalPointTasksBaseResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize(Roles = "Admin, Sub-Admin, Focal Point")]
    public async Task<IActionResult> GetFocalPointTasks([FromRoute]Guid departmentId)
    {
        var focalPointTasksResult = await _departmentService.GetFocalPointTasksAsync(departmentId);

        return focalPointTasksResult.Match(
            _ => Ok(_mapper.Map<List<GetAllFocalPointTasksBaseResponse>>(focalPointTasksResult.Value)),
            errors => Problem(errors)
        );
    }

    // Get focal point task by id
    [HttpGet("{id:Guid}")]
    [ProducesResponseType(typeof(GetFocalPointTaskResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize(Roles = "Admin, Sub-Admin, Focal Point")]
    public async Task<IActionResult> GetFocalPointTask([FromRoute]Guid departmentId, [FromRoute]Guid id)
    {
        var focalPointTaskResult = await _departmentService.GetFocalPointTaskByIdAsync(departmentId, id);

        return focalPointTaskResult.Match(
            _ => Ok(_mapper.Map<GetFocalPointTaskResponse>(focalPointTaskResult.Value)),
            errors => Problem(errors)
        );
    }

    // Submit focal point task
    [HttpPost("{id:Guid}/submission")]
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
            _ => Ok(),
            errors => Problem(errors)
        );
    }
}
