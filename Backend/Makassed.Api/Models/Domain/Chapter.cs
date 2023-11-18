namespace Makassed.Api.Models.Domain;

public class Chapter
{
    public Guid Id { get; set; }
    
    public string Name { get; set; } = null!;

    public bool EnableState { get; set; }

    public ICollection<Policy> Policies { get; set; } = new List<Policy>();
}