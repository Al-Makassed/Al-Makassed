using Makassed.Api.Services.MonitoringTools;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Makassed.Api.Controllers;

public class MonitoringToolsController : ApiController
{
    private readonly IMonitoringToolService _monitoringToolService;

    public MonitoringToolsController(IMonitoringToolService monitoringToolService)
    {
        _monitoringToolService = monitoringToolService;
    }
}
