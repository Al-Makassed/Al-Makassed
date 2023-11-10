using AutoMapper;
using Makassed.Api.Models.Domain;
using Makassed.Api.Services.MonitoringTools;
using Makassed.Contracts.MonitoringTool;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Makassed.Api.Controllers;

public class MonitoringToolsController : ApiController
{
    private readonly IMonitoringToolService _monitoringToolService;
    private readonly IMapper _mapper;

    public MonitoringToolsController(IMonitoringToolService monitoringToolService, IMapper mapper)
    {
        _monitoringToolService = monitoringToolService;
        _mapper = mapper;
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<GetMonitoringToolResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    // [Authorize(Roles = "Admin, Sub-Admin")]
    public async Task<IActionResult> GetMonitoringTools()
    {
        var result = await _monitoringToolService.GetMonitoringToolsAsync();
        
        return Ok(_mapper.Map<List<GetMonitoringToolResponse>>(result));
    }

    [HttpGet("focal-point-monitoring-tools")]
    [ProducesResponseType(typeof(List<GetMonitoringToolResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    // [Authorize(Roles = "Focal Point")]
    public async Task<IActionResult> GetFocalPointMonitoringTools(string focalPointId)
    {
        var result = await _monitoringToolService.GetFocalPointMonitoringToolsAsync(focalPointId);

        return result.Match(
            _ => Ok(_mapper.Map<List<GetMonitoringToolResponse>>(result.Value)), 
            errors => Problem(errors)
        );
    }

    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(List<GetMonitoringToolResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize(Roles = "Admin, Sub-Admin, Focal Point")]
    public async Task<IActionResult> GetMonitoringTool(Guid id) 
    {
        var result = await _monitoringToolService.GetMonitoringToolByIdAsync(id);
        
        return result.Match(
            _ => Ok(_mapper.Map<GetMonitoringToolResponse>(result.Value)), 
            errors => Problem(errors)
        );
    }

    [HttpPost]
    [ProducesResponseType(typeof(List<GetMonitoringToolResponse>), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> CreateMonitoringTool(CreateMonitoringToolRequest request)
    {
        var monitoringTool = _mapper.Map<MonitoringTool>(request);
        
        var result = await _monitoringToolService.CreateMonitoringToolAsync(monitoringTool, request.DepartmentsIdes, request.FieldsIdes);

        return result.Match(
            _ => CreatedAtAction(nameof(GetMonitoringTool), new { id = result.Value.Id }, _mapper.Map<GetMonitoringToolResponse>(result.Value)),
            errors => Problem(errors)
        );
    }

    [HttpPut("{id:guid}")]
    [ProducesResponseType(typeof(List<GetMonitoringToolResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateMonitoringTool(Guid id, UpdateMonitoringToolRequest request)
    {
        var monitoringTool = _mapper.Map<MonitoringTool>(request);
        
        var result = await _monitoringToolService.UpdateMonitoringToolAsync(id, monitoringTool, request.DepartmentsIdes, request.FieldsIdes);

        return result.Match(
            _ => Ok(_mapper.Map<GetMonitoringToolResponse>(result.Value)),
            errors => Problem(errors)
        );
    }
}