using Makassed.Api.Models.Domain;
using Sieve.Models;

namespace Makassed.Api.Repositories;

public interface IMonitoringToolRepository
{
    Task<List<MonitoringTool>> GetMonitoringToolsAsync(SieveModel sieveModel);
    
    Task<MonitoringTool?> GetMonitoringToolByIdAsync(Guid id);
    
    Task<MonitoringTool?> CreateMonitoringToolAsync(MonitoringTool monitoringTool);
    
    Task<MonitoringTool?> UpdateMonitoringToolAsync(Guid id, MonitoringTool monitoringTool);
    
    Task<MonitoringTool?> DeleteMonitoringToolAsync(Guid id);
}