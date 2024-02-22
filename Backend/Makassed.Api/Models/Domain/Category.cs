namespace Makassed.Api.Models.Domain;

public class Category
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    // Navigation Properties
    public List<Field> Fields { get; set; } = new();
}
