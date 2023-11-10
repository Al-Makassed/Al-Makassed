using ErrorOr;
using Makassed.Api.Models.Domain;
using Makassed.Api.Repositories;
using Makassed.Api.ServiceErrors;
using Microsoft.IdentityModel.Tokens;

namespace Makassed.Api.Services.MonitoringTools;

public class MonitoringToolService : IMonitoringToolService
{
    private readonly IMonitoringToolRepository _monitoringToolRepository;
    private readonly IDepartmentRepository _departmentRepository;
    private readonly IFieldRepository _fieldRepository;

    public MonitoringToolService(IMonitoringToolRepository monitoringToolRepository, IDepartmentRepository departmentRepository, IFieldRepository fieldRepository)
    {
        _monitoringToolRepository = monitoringToolRepository;
        _departmentRepository = departmentRepository;
        _fieldRepository = fieldRepository;
    }

    public async Task<List<MonitoringTool>> GetMonitoringToolsAsync()
    {
        return await _monitoringToolRepository.GetMonitoringToolsAsync();
    }

    public async Task<ErrorOr<List<MonitoringTool>>> GetFocalPointMonitoringToolsAsync(string focalPointId)
    {
        var result = await _monitoringToolRepository.GetFocalPointMonitoringToolsAsync(focalPointId);

        if (result is null)
            return Errors.User.NotFocalPoint;

        return result;
    }

    public async Task<ErrorOr<MonitoringTool>> GetMonitoringToolByIdAsync(Guid id)
    {
        var result = await _monitoringToolRepository.GetMonitoringToolByIdAsync(id);

        return result is null ? Errors.MonitoringTool.NotFound : result;
    }

    // Assign the departments to the monitoring tool
    private async Task<ErrorOr<MonitoringTool>> AssignDepartmentsAsync(MonitoringTool monitoringTool, List<Guid> departmentsIdes)
    {
        var departments = new List<Department>();

        foreach (var departmentId in departmentsIdes)
        {
            var department = await _departmentRepository.GetDepartmentAsync(departmentId);

            if (department is not null)
                departments.Add(department);
        }

        // Check if there are any valid departments
        if (departments.IsNullOrEmpty())
            return Errors.MonitoringTool.NoValidAssignedDepartments;

        monitoringTool.Departments = departments;

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

    public async Task<ErrorOr<MonitoringTool>> CreateMonitoringToolAsync(MonitoringTool monitoringTool, List<Guid> departmentsIdes, List<Guid> fieldsIdes)
    {
        // Add the existed departments and fields to the monitoring tool
        var departments = await AssignDepartmentsAsync(monitoringTool, departmentsIdes);

        if (departments.IsError)
            return departments.Errors;

        var fields = await AssignFieldsAsync(monitoringTool, fieldsIdes);

        if (fields.IsError)
            return fields.Errors;

        // Create the monitoring tool
        var result = await _monitoringToolRepository.CreateMonitoringToolAsync(monitoringTool);
        
        // Return error if the monitoring tool already exists and return the monitoring tool if it was created successfully
        return result is null ? Errors.MonitoringTool.NameAlreadyExist : result;
    }

    public async Task<ErrorOr<MonitoringTool>> UpdateMonitoringToolAsync(Guid id, MonitoringTool monitoringTool, List<Guid> requestDepartmentsIdes,
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
        
        return  result is null ? Errors.MonitoringTool.NotFound : result;
    }
}