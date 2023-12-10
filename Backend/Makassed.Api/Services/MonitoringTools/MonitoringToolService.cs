using AutoMapper;
using ErrorOr;
using Makassed.Api.Models.Domain;
using Makassed.Api.Models.DTO;
using Makassed.Api.Repositories.Interfaces;
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
    private readonly IUnitOfWork _unitOfWork;

    public MonitoringToolService(IMonitoringToolRepository monitoringToolRepository, IDepartmentRepository departmentRepository, IFieldRepository fieldRepository, IMapper mapper, IUserService userService, IUnitOfWork unitOfWork)
    {
        _monitoringToolRepository = monitoringToolRepository;
        _departmentRepository = departmentRepository;
        _fieldRepository = fieldRepository;
        _mapper = mapper;
        _userService = userService;
        _unitOfWork = unitOfWork;
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
        var userRole = await _userService.GetUserRoleAsync();

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

    public async Task<ErrorOr<MonitoringToolDto>> UpdateMonitoringToolAsync(Guid id, MonitoringTool monitoringTool)
    {
        var result = await _monitoringToolRepository.UpdateMonitoringToolAsync(id, monitoringTool);
        
        return  result is null ? Errors.MonitoringTool.NotFound : MapMonitoringToolDto(result);
    }

    public async Task<ErrorOr<MonitoringToolDto>> DeleteMonitoringToolAsync(Guid id)
    {
        var result = await _monitoringToolRepository.DeleteMonitoringToolAsync(id);

        return result is null ? Errors.MonitoringTool.NotFound : MapMonitoringToolDto(result);
    }

    public async Task<ErrorOr<Deleted>> DeleteFieldFromMonitoringToolAsync(Guid id, Guid fieldId)
    {
        var monitoringTool = await _monitoringToolRepository.GetMonitoringToolByIdAsync(id);

        if (monitoringTool is null)
            return Errors.MonitoringTool.NotFound;

        var field = monitoringTool!.Fields.FirstOrDefault(f => f.Id == fieldId);

        if (field is null)
            return Errors.MonitoringTool.FieldNotFound;

        // if the field is the last one, return error
        if (monitoringTool.Fields.Count == 1)
            return Errors.MonitoringTool.LastField;

        monitoringTool.Fields.Remove(field);

        await _unitOfWork.SaveChangesAsync();

        return Result.Deleted;
    }

    public async Task<ErrorOr<Deleted>> UnassignMonitoringToolToDepartmentAsync(Guid id, Guid departmentId)
    {
        var monitoringTool = await _monitoringToolRepository.GetMonitoringToolByIdAsync(id);

        if (monitoringTool is null)
            return Errors.MonitoringTool.NotFound;

        // get the focal point task
        var focalPointTaskToDelete = monitoringTool.FocalPointTasks.FirstOrDefault(fpt => fpt.DepartmentId == departmentId);

        if (focalPointTaskToDelete is null)
            return Errors.MonitoringTool.DepartmentNotFound;

        // if the focal point task is the last one, return error
        if (monitoringTool.FocalPointTasks.Count == 1)
            return Errors.MonitoringTool.LastFocalPointTask;

        // remove the focal point task from the monitoring tool
        monitoringTool.FocalPointTasks.Remove(focalPointTaskToDelete);

        await _unitOfWork.SaveChangesAsync();

        return Result.Deleted;
    }
}