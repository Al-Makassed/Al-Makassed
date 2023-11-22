using Makassed.Api.Data;

namespace Makassed.Api.Repositories;

public class SqlUserRepository : IUserRepository
{
    private readonly MakassedDbContext _dbContext;

    public SqlUserRepository(MakassedDbContext dbContext)
    {
        _dbContext = dbContext;
    }
}
