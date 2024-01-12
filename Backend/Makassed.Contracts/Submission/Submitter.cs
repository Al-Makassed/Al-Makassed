namespace Makassed.Contracts.Submission;

public record Submitter
{
    public required string Id { get; set; }

    public required string userName { get; set; }

    public string? FullName { get; set; }

    public string? AvatarUrl { get; set; }
}
