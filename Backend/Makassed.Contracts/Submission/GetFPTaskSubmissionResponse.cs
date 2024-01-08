namespace Makassed.Contracts.Submission;

public record GetFpTaskSubmissionResponse
{
    public required Guid Id { get; set; }

    public required Guid FocalPointTaskId { get; set; }

    public required int Number { get; set; }

    public required DateTime SubmittedAt { get; set; }

    public Submitter Submitter { get; set; } = null!;
}
