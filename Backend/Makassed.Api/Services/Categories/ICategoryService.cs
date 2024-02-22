using ErrorOr;
using Makassed.Api.Models.Domain;

namespace Makassed.Api.Services.Categories;

public interface ICategoryService
{
    Task<List<Category>> GetCategoriesAsync();

    Task<ErrorOr<Category>> GetCategoryAsync(Guid id);

    Task<ErrorOr<Category>> CreateCategoryAsync(Category category);

    Task<ErrorOr<Category>> UpdateCategoryAsync(Guid id, Category category);

    Task<ErrorOr<Category>> DeleteCategoryAsync(Guid id);
}
