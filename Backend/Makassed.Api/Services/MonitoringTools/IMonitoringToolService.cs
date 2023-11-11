using ErrorOr;
using Makassed.Api.Models.Domain;

namespace Makassed.Api.Services.MonitoringTools;

public interface IMonitoringToolService
{
    Task<List<MonitoringTool>> GetMonitoringToolsAsync();
    
    Task<ErrorOr<MonitoringTool>> GetMonitoringToolByIdAsync(Guid id);
    
    Task<ErrorOr<MonitoringTool>> CreateMonitoringToolAsync(MonitoringTool monitoringTool, List<Guid> departmentsIdes, List<Guid> fieldsIdes);
    
    Task<ErrorOr<MonitoringTool>> UpdateMonitoringToolAsync(Guid id, MonitoringTool monitoringTool, List<Guid> requestDepartmentsIdes, List<Guid> requestFieldsIdes);
    
    Task<ErrorOr<MonitoringTool>> DeleteMonitoringToolAsync(Guid id);
}