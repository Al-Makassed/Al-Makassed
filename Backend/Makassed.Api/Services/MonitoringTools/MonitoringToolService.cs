using ErrorOr;
using Makassed.Api.Models.Domain;
using Makassed.Api.Repositories;
using Makassed.Api.ServiceErrors;

namespace Makassed.Api.Services.MonitoringTools;

public class MonitoringToolService : IMonitoringToolService
{
    private readonly IMonitoringToolRepository _monitoringToolRepository;

    public MonitoringToolService(IMonitoringToolRepository monitoringToolRepository)
    {
        _monitoringToolRepository = monitoringToolRepository;
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

    public async Task<ErrorOr<MonitoringTool>> GetFocalPointByIdAsync(Guid id)
    {
        var result = await _monitoringToolRepository.GetFocalPointByIdAsync(id);

        return result is null ? Errors.MonitoringTool.NotFound : result;
    }
}