namespace Makassed.Api.Models.Domain;

public class Field
{
    public Guid Id { get; set; }

    public string Content { get; set; } = null!;

    public List<MonitoringTool> MonitoringTools { get; set; } = new();
}