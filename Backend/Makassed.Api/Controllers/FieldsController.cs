using AutoMapper;
using Makassed.Api.Models.Domain;
using Makassed.Api.Services.MonitoringTools.Fields;
using Makassed.Contracts.MonitoringTool.Field;
using Microsoft.AspNetCore.Mvc;

namespace Makassed.Api.Controllers;
public class FieldsController : ApiController
{
    private readonly IFieldService _fieldService;
    private readonly IMapper _mapper;

    public FieldsController(IFieldService fieldService, IMapper mapper)
    {
        _fieldService = fieldService;
        _mapper = mapper;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetFields()
    {
        var fields = await _fieldService.GetFieldsAsync();
        
        return Ok(_mapper.Map<List<GetFieldResponse>>(fields));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetField(Guid id)
    {
        var field = await _fieldService.GetFieldAsync(id);
        
        return Ok(_mapper.Map<GetFieldResponse>(field));
    }

    [HttpPost]
    public async Task<IActionResult> CreateField([FromBody] CreateFieldRequest request)
    {
        var field = await _fieldService.CreateFieldAsync(_mapper.Map<Field>(request));
        return Ok(_mapper.Map<GetFieldResponse>(field));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateField(Guid id, [FromBody] UpdateFieldRequest request)
    {
        var field = await _fieldService.UpdateFieldAsync(id, _mapper.Map<Field>(request));
        return Ok(field);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteField(Guid id)
    {
        await _fieldService.DeleteFieldAsync(id);
        return Ok();
    }
}
