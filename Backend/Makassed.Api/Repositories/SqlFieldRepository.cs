using Makassed.Api.Data;
using Makassed.Api.Models.Domain;

namespace Makassed.Api.Repositories;

public class SqlFieldRepository : IFieldRepository
{
    private readonly MakassedDbContext _dbContext;

    public SqlFieldRepository(MakassedDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public Task<List<Field>> GetFieldsAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Field> GetFieldAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<Field> CreateFieldAsync(Field field)
    {
        throw new NotImplementedException();
    }

    public Task<Field> UpdateFieldAsync(Guid id, Field field)
    {
        throw new NotImplementedException();
    }

    public Task<Field> DeleteFieldAsync(Guid id)
    {
        throw new NotImplementedException();
    }
}