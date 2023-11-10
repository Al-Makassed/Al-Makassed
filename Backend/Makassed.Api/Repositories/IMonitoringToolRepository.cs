using Makassed.Api.Models.Domain;

namespace Makassed.Api.Repositories;

public interface IMonitoringToolRepository
{
    Task<List<MonitoringTool>> GetMonitoringToolsAsync();
    
    Task<List<MonitoringTool>?> GetFocalPointMonitoringToolsAsync(string focalPointId);
    
    Task<MonitoringTool?> GetMonitoringToolByIdAsync(Guid id);
    
    Task<MonitoringTool?> CreateMonitoringToolAsync(MonitoringTool monitoringTool);
    
    Task<MonitoringTool?> UpdateMonitoringToolAsync(Guid id, MonitoringTool monitoringTool);
}