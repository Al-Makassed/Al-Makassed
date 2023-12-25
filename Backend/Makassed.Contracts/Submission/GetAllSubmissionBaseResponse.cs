namespace Makassed.Contracts.Submission;

public record GetAllSubmissionBaseResponse
{
    public required Guid Id { get; set; }

    public required Guid FocalPointTaskId { get; set; }

    public required string SubmitterId { get; set; }

    public required int Number { get; set; }

    public required DateTime SubmittedAt { get; set; }
}
