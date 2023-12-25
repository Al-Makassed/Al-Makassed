namespace Makassed.Contracts.Submission;

public record Submitter
{
    public required string Id { get; set; }

    public required string Name { get; set; }

    public string? FullName { get; set; }

    public string? AvatarUrl { get; set; }
}
