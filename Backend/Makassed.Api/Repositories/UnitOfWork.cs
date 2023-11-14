using Makassed.Api.Data;

namespace Makassed.Api.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly MakassedDbContext _dbContext;

    public UnitOfWork(MakassedDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task SaveChangesAsync()
    {
       await _dbContext.SaveChangesAsync();
    }
}
