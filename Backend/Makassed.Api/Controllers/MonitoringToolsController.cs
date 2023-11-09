using AutoMapper;using Makassed.Api.Services.MonitoringTools;
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
    public async Task<IActionResult> GetFocalPoint(Guid id) 
    {
        var result = await _monitoringToolService.GetFocalPointByIdAsync(id);
        return Ok(_mapper.Map<GetMonitoringToolResponse>(result));
    }
}