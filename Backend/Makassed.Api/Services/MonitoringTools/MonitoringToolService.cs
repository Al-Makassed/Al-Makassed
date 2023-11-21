using AutoMapper;
using ErrorOr;
using Makassed.Api.Models.Domain;
using Makassed.Api.Models.DTO;
using Makassed.Api.Repositories;
using Makassed.Api.ServiceErrors;
using Makassed.Api.Services.Users;
using Microsoft.IdentityModel.Tokens;
using Sieve.Models;

namespace Makassed.Api.Services.MonitoringTools;

public class MonitoringToolService : IMonitoringToolService
{
    private readonly IMonitoringToolRepository _monitoringToolRepository;
    private readonly IDepartmentRepository _departmentRepository;
    private readonly IFieldRepository _fieldRepository;
    private readonly IMapper _mapper;
    private readonly IUserService _userService;

    public MonitoringToolService(IMonitoringToolRepository monitoringToolRepository, IDepartmentRepository departmentRepository, IFieldRepository fieldRepository, IMapper mapper, IUserService userService)
    {
        _monitoringToolRepository = monitoringToolRepository;
        _departmentRepository = departmentRepository;
        _fieldRepository = fieldRepository;
        _mapper = mapper;
        _userService = userService;
    }

    public async Task<List<MonitoringTool>> GetMonitoringToolsAsync(SieveModel sieveModel)
    {
        return await _monitoringToolRepository.GetMonitoringToolsAsync(sieveModel);
    }

    private MonitoringToolDto MapMonitoringToolDto(MonitoringTool monitoringTool)
    {
        var mt = _mapper.Map<MonitoringToolDto>(monitoringTool);
        var departments = monitoringTool.FocalPointTasks.Select(fpt => fpt.Department).ToList();
        mt.Departments = departments;

        return mt;
    }

    public async Task<ErrorOr<MonitoringToolDto>> GetMonitoringToolByIdAsync(Guid id)
    {
        var result = await _monitoringToolRepository.GetMonitoringToolByIdAsync(id);

        return result is null ? Errors.MonitoringTool.NotFound : MapMonitoringToolDto(result);
    }

    // Assign the departments to the monitoring tool by adding them to the focal point tasks
    private async Task<ErrorOr<MonitoringTool>> AssignDepartmentsAsync(MonitoringTool monitoringTool, List<Guid> departmentsIdes)
    {
        var focalPointTasks = new List<FocalPointTask>();

        foreach (var departmentId in departmentsIdes)
        {
            var department = await _departmentRepository.GetDepartmentAsync(departmentId);

            if (department is not null)
                focalPointTasks.Add(new FocalPointTask 
                { 
                    MonitoringToolId = monitoringTool.Id,
                    DepartmentId = department.Id
                });
        }

        // Check if there are any valid focal point tasks
        if (focalPointTasks.IsNullOrEmpty())
            return Errors.MonitoringTool.NoValidAssignedDepartments;

        monitoringTool.FocalPointTasks = focalPointTasks;

        return monitoringTool;
    }

    // Assign the fields to the monitoring tool
    private async Task<ErrorOr<MonitoringTool>> AssignFieldsAsync(MonitoringTool monitoringTool, List<Guid> fieldsIdes)
    {
        var fields = new List<Field>();

        foreach (var fieldId in fieldsIdes)
        {
            var field = await _fieldRepository.GetFieldAsync(fieldId);

            if (field is not null)
                fields.Add(field);
        }

        // Check if there are any valid fields
        if (fields.IsNullOrEmpty())
            return Errors.MonitoringTool.NoValidFields;

        monitoringTool.Fields = fields;

        return monitoringTool;
    }

    public async Task<ErrorOr<MonitoringToolDto>> CreateMonitoringToolAsync(MonitoringTool monitoringTool, List<Guid> departmentsIdes, List<Guid> fieldsIdes)
    {
        var userRole = _userService.GetUserRole();

        if (userRole is null)
            return Errors.User.Unauthorized;

        // Add the existed departments and fields to the monitoring tool
        var departments = await AssignDepartmentsAsync(monitoringTool, departmentsIdes);

        if (departments.IsError)
            return departments.Errors;

        var fields = await AssignFieldsAsync(monitoringTool, fieldsIdes);

        if (fields.IsError)
            return fields.Errors;

        monitoringTool.CreatorId = _userService.GetUserId()!;

        if (userRole.Equals("Admin"))
            monitoringTool.IsApproved = true;

        // Create the monitoring tool
        var result = await _monitoringToolRepository.CreateMonitoringToolAsync(monitoringTool);
        
        // Return error if the monitoring tool already exists and return the monitoring tool if it was created successfully
        return result is null ? Errors.MonitoringTool.NameAlreadyExist : MapMonitoringToolDto(result);
    }

    public async Task<ErrorOr<MonitoringToolDto>> UpdateMonitoringToolAsync(Guid id, MonitoringTool monitoringTool, List<Guid> requestDepartmentsIdes,
        List<Guid> requestFieldsIdes)
    {
        // Add the existed departments and fields to the monitoring tool
        var departments = await AssignDepartmentsAsync(monitoringTool, requestDepartmentsIdes);

        if (departments.IsError)
            return departments.Errors;

        var fields = await AssignFieldsAsync(monitoringTool, requestFieldsIdes);

        if (fields.IsError)
            return fields.Errors;

        // Update the monitoring tool
        var result = await _monitoringToolRepository.UpdateMonitoringToolAsync(id, monitoringTool);
        
        return  result is null ? Errors.MonitoringTool.NotFound : MapMonitoringToolDto(result);
    }

    public async Task<ErrorOr<MonitoringToolDto>> DeleteMonitoringToolAsync(Guid id)
    {
        var result = await _monitoringToolRepository.DeleteMonitoringToolAsync(id);

        return result is null ? Errors.MonitoringTool.NotFound : MapMonitoringToolDto(result);
    }
}