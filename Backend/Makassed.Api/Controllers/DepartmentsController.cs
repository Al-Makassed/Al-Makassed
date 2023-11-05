using AutoMapper;
using Makassed.Api.Models.Domain;
using Makassed.Api.Services.Users.Departments;
using Makassed.Contracts.User.Department;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Makassed.Api.Controllers;

[Authorize(Roles = "Admin, Sub-Admin")]
public class DepartmentsController : ApiController
{
    private readonly IDepartmentService _departmentService;
    private readonly IMapper _mapper;

    public DepartmentsController(IDepartmentService departmentService, IMapper mapper)
    {
        _departmentService = departmentService;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult> GetDepartments()
    {
        return Ok(_mapper.Map<List<GetDepartmentResponse>>(await _departmentService.GetDepartmentsAsync()));
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetDepartment(Guid id)
    {
        var departmentResult = await _departmentService.GetDepartmentAsync(id);

        return departmentResult.Match(
            _ => Ok(),
            Problem
        );
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateDepartment(CreateDepartmentRequest request)
    {
        var departmentResult = await _departmentService.CreateDepartmentAsync(_mapper.Map<Department>(request));

        return departmentResult.Match(
            _ => CreatedAtAction(nameof(GetDepartment), new { id = departmentResult.Value.Id }, _mapper.Map<GetDepartmentResponse>(departmentResult.Value)),
            errors => Problem(errors)
        );
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateDepartment(Guid id, UpdateDepartmentRequest request)
    {
        var departmentResult = await _departmentService.UpdateDepartmentAsync(id, _mapper.Map<Department>(request));

        return departmentResult.Match(
            _ => Ok(_mapper.Map<GetDepartmentResponse>(departmentResult.Value)),
            errors => Problem(errors)
        );
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> DeleteDepartment(Guid id)
    {
        var departmentResult = await _departmentService.DeleteDepartmentAsync(id);

        return departmentResult.Match(
            _ => Ok(departmentResult.Value),
            errors => Problem(errors) 
        );
    }
}