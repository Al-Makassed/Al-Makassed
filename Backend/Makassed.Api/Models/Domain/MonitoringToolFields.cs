using System.ComponentModel.DataAnnotations;

namespace Makassed.Api.Models.Domain;

public class MonitoringToolFields
{
    public Guid MonitoringToolId { get; set; }

    public Guid FieldId { get; set; }

    // Navigation Properties
    public MonitoringTool MonitoringTool { get; set; } = null!;

    public Field Field { get; set; } = null!;

    //public List<Submission> Submissions { get; set; } = new();
    public List<MonitoringToolFieldsSubmissions> MonitoringToolFieldsSubmissions { get; set; } = new();
}
