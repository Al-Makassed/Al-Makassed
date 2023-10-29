using Makassed.Api.Data;
using Makassed.Api.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace Makassed.Api.Repositories;

public class SqlFieldRepository : IFieldRepository
{
    private readonly MakassedDbContext _dbContext;

    public SqlFieldRepository(MakassedDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public async Task<List<Field>> GetFieldsAsync()
    {
        return await _dbContext.Fields.ToListAsync();
    }

    public async Task<Field?> GetFieldAsync(Guid id)
    {
        return await _dbContext.Fields.FirstOrDefaultAsync(f => f.Id == id);
    }

    public async Task<Field?> GetFieldByContentAsync(string fieldContent)
    {
        return await _dbContext.Fields.FirstOrDefaultAsync(f => f.Content == fieldContent);
    }

    public async Task<Field> CreateFieldAsync(Field field)
    {
        await _dbContext.Fields.AddAsync(field);
        await _dbContext.SaveChangesAsync();

        return field;
    }

    public async Task<Field?> UpdateFieldAsync(Guid id, Field field)
    {
        
        var fieldToUpdate = await _dbContext.Fields.FirstOrDefaultAsync(f => f.Id == id);

        if (fieldToUpdate is null)
            return null;

        fieldToUpdate.Content = field.Content;

        await _dbContext.SaveChangesAsync();

        return fieldToUpdate;
    }

    public async Task<Field?> DeleteFieldAsync(Guid id)
    {
        var fieldToDelete = await _dbContext.Fields.FirstOrDefaultAsync(f => f.Id == id);

        if (fieldToDelete is null)
            return null;

        _dbContext.Fields.Remove(fieldToDelete);
        await _dbContext.SaveChangesAsync();

        return fieldToDelete;
    }
}