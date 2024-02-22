using ErrorOr;
using Makassed.Api.Data;
using Makassed.Api.Models.Domain;
using Makassed.Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Makassed.Api.Repositories.Implementations;

public class SqlCategoryRepository : ICategoryRepository
{
    private readonly MakassedDbContext _dbContext;

    public SqlCategoryRepository(MakassedDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Category>> GetCategoriesAsync()
    {
        return await _dbContext.Categories.ToListAsync();
    }

    public async Task<Category?> GetCategoryAsync(Guid id)
    {
        return await _dbContext.Categories.FindAsync(id);
    }

    public async Task<Category> CreateCategoryAsync(Category category)
    {
        var result = await _dbContext.Categories.AddAsync(category);

        await _dbContext.SaveChangesAsync();

        return result.Entity;
    }

    public async Task<Category> UpdateCategoryAsync(Guid id, Category category)
    {
        var existingCategory = await _dbContext.Categories.FindAsync(id);

        existingCategory!.Name = category.Name;

        await _dbContext.SaveChangesAsync();

        return existingCategory;
    }

    public async Task DeleteCategoryAsync(Guid id)
    {
        var category = await _dbContext.Categories.FindAsync(id);

        _dbContext.Categories.Remove(category!);

        await _dbContext.SaveChangesAsync();
    }
}
