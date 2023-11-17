using Makassed.Api.Models.Domain;

namespace Makassed.Api.Repositories;

public interface IMonitoringToolRepository
{
    Task<List<MonitoringTool>> GetMonitoringToolsAsync();
    
    Task<MonitoringTool?> GetMonitoringToolByIdAsync(Guid id);
    
    Task<MonitoringTool?> CreateMonitoringToolAsync(MonitoringTool monitoringTool);
    
    Task<MonitoringTool?> UpdateMonitoringToolAsync(Guid id, MonitoringTool monitoringTool);
    
    Task<MonitoringTool?> DeleteMonitoringToolAsync(Guid id);
}