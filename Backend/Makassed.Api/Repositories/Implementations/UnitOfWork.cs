using Makassed.Api.Data;
using Makassed.Api.Repositories.Interfaces;

namespace Makassed.Api.Repositories.Implementations;

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
