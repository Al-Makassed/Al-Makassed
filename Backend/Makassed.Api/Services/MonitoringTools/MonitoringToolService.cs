using Makassed.Api.Repositories;

namespace Makassed.Api.Services.MonitoringTools;

public class MonitoringToolService : IMonitoringToolService
{
    private readonly IMonitoringToolRepository _monitoringToolRepository;

    public MonitoringToolService(IMonitoringToolRepository monitoringToolRepository)
    {
        _monitoringToolRepository = monitoringToolRepository;
    }
}
