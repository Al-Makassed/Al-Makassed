using Makassed.Api.Models.Domain;

namespace Makassed.Api.Repositories;

public interface IMonitoringToolRepository
{
    Task<List<MonitoringTool>> GetMonitoringToolsAsync();
    
    Task<List<MonitoringTool>?> GetFocalPointMonitoringToolsAsync(string focalPointId);
    
    Task<MonitoringTool?> GetFocalPointByIdAsync(Guid id);
}