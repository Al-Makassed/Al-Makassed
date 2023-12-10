using ErrorOr;
using Makassed.Api.Models.Domain;
using Makassed.Api.Models.DTO;
using Sieve.Models;

namespace Makassed.Api.Services.MonitoringTools;

public interface IMonitoringToolService
{
    Task<List<MonitoringTool>> GetMonitoringToolsAsync(SieveModel sieveModel);
    
    Task<ErrorOr<MonitoringToolDto>> GetMonitoringToolByIdAsync(Guid id);
    
    Task<ErrorOr<MonitoringToolDto>> CreateMonitoringToolAsync(MonitoringTool monitoringTool, List<Guid> departmentsIdes, List<Guid> fieldsIdes);
    
    Task<ErrorOr<MonitoringToolDto>> UpdateMonitoringToolAsync(Guid id, MonitoringTool monitoringTool);
    
    Task<ErrorOr<MonitoringToolDto>> DeleteMonitoringToolAsync(Guid id);

    Task<ErrorOr<Deleted>> DeleteFieldFromMonitoringToolAsync(Guid id, Guid fieldId);

    Task<ErrorOr<Deleted>> UnassignMonitoringToolToDepartmentAsync(Guid id, Guid departmentId);
}