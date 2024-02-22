namespace Makassed.Contracts.Category;

public record UpdateCategoryRequest
{
    public required string Name { get; set; }
}
