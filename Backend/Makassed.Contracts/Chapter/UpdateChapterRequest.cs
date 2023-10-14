namespace Makassed.Contracts.Chapter;

public record UpdateChapterRequest
{
    public required string Name { get; set; }

    public IEnumerable<string> PoliciesIdes { get; set; } = new List<string>();
}