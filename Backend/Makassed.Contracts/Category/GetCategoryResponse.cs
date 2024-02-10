namespace Makassed.Contracts.Category;

public record GetCategoryResponse
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
}
