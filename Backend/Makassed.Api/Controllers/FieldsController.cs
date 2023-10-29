﻿using AutoMapper;
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
        return Ok(_mapper.Map<List<GetFieldResponse>>(await _fieldService.GetFieldsAsync()));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetField(Guid id)
    {
        var fieldResult = await _fieldService.GetFieldAsync(id);

        return fieldResult.Match(
            _ => Ok(_mapper.Map<GetFieldResponse>(fieldResult.Value)),
            errors => Problem(errors)
        );
            
    }

    [HttpPost]
    public async Task<IActionResult> CreateField([FromBody] CreateFieldRequest request)
    {
        var fieldResult = await _fieldService.CreateFieldAsync(_mapper.Map<Field>(request));

        return fieldResult.Match(
            _ => CreatedAtAction(nameof(GetField), new { id = fieldResult.Value.Id }, _mapper.Map<GetFieldResponse>(fieldResult.Value)),
            errors => Problem(errors)
        );
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
