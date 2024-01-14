namespace Makassed.Contracts.Search;

public record FpTaskSearchResponse : Searchable
{
    public override SearchEntityType SearchEntityType { get; } = SearchEntityType.FocalPointTask;

    public Guid MonitoringToolId { get; set; }

    public Guid DepartmentId { get; set; }

    public MonitoringToolSearchResponse MonitoringTool { get; set; } = null!;
}
