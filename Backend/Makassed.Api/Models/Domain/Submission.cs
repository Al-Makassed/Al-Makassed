namespace Makassed.Api.Models.Domain;

public class Submission
{
    public Guid Id { get; set; }
    
    public Guid FocalPointTaskId { get; set; }

    public string SubmitterId { get; set; } = null!;

    public int Number { get; set; }

    public DateTime SubmittedAt { get; set; }

    // Navigation Properties
    public FocalPointTask FocalPointTask { get; set; } = null!;

    public MakassedUser Submitter { get; set; } = null!;

    public List<FieldAnswer> Answers { get; set; } = new();
}