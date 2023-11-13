using Makassed.Contracts.MonitoringTool.Field;

namespace Makassed.Contracts.MonitoringTool;

public record GetMonitoringToolForFocalPointResponse
{
    public Guid Id { get; set; }

    public required string Name { get; set; }

    public required string Description { get; set; }

    public DateTime LastModified { get; set; }

    public IEnumerable<GetFieldResponse> Fields { get; set; } = new List<GetFieldResponse>();
}