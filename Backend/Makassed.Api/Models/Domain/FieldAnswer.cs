namespace Makassed.Api.Models.Domain;

public class FieldAnswer
{
    public Guid FieldId { get; set; }

    public Guid SubmissionId { get; set; }

    public bool Answer { get; set; }

    // Navigation properties
    public Field Field { get; set; } = null!;

    public Submission Submission { get; set; } = null!;
}