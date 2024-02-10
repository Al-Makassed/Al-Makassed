namespace Makassed.Contracts.Category;

public record CreateCategoryRequest
{
    public required string Name { get; set; }
}
