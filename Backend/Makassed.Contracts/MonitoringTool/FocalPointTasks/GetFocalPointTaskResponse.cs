namespace Makassed.Contracts.MonitoringTool.FocalPointTasks;

public record GetFocalPointTaskResponse
{
    public Guid Id { get; set; }

    public Guid DepartmentId { get; set; }

    public GetAllMonitoringToolBaseResponse MonitoringTool { get; set; } = null!;

    public int TotalSubmissions { get; set; }

    public bool IsFinished { get; set; }
}