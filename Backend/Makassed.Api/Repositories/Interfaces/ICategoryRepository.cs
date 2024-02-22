using ErrorOr;
using Makassed.Api.Models.Domain;

namespace Makassed.Api.Repositories.Interfaces;

public interface ICategoryRepository
{
    Task<List<Category>> GetCategoriesAsync();

    Task<Category?> GetCategoryAsync(Guid id);

    Task<Category> CreateCategoryAsync(Category category);

    Task<Category> UpdateCategoryAsync(Guid id, Category category);

    Task DeleteCategoryAsync(Guid id);
}
