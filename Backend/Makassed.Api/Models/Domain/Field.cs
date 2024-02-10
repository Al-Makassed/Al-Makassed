namespace Makassed.Api.Models.Domain;

public class Field
{
    public Guid Id { get; set; }

    public string Content { get; set; } = null!;

    public Guid CategoryId { get; set; }

    // Navigation Properties
    public List<MonitoringTool> MonitoringTools { get; set; } = new();

    public List<FieldAnswer> Answers { get; set; } = new();

    public Category Category { get; set; } = null!;
}