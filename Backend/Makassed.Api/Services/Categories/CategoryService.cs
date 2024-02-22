using ErrorOr;
using Makassed.Api.Models.Domain;
using Makassed.Api.Repositories.Interfaces;
using Makassed.Api.ServiceErrors;

namespace Makassed.Api.Services.Categories;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryService(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<List<Category>> GetCategoriesAsync()
    {
        var categories = await _categoryRepository.GetCategoriesAsync();

        return categories;
    }

    public async Task<ErrorOr<Category>> GetCategoryAsync(Guid id)
    {
        var category = await _categoryRepository.GetCategoryAsync(id);

        return category == null ? Errors.Category.NotFound : category;
    }

    public async Task<ErrorOr<Category>> CreateCategoryAsync(Category category)
    {
        return await _categoryRepository.CreateCategoryAsync(category);
    }

    public async Task<ErrorOr<Category>> UpdateCategoryAsync(Guid id, Category category)
    {
        var existingCategory = await _categoryRepository.GetCategoryAsync(id);

        if (existingCategory == null)
            return Errors.Category.NotFound;

        return await _categoryRepository.UpdateCategoryAsync(id, category);
    }

    public async Task<ErrorOr<Category>> DeleteCategoryAsync(Guid id)
    {
        var existingCategory = await _categoryRepository.GetCategoryAsync(id);

        if (existingCategory == null)
            return Errors.Category.NotFound;

        await _categoryRepository.DeleteCategoryAsync(id);

        return existingCategory;
    }
}
