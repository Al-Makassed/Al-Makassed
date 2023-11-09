using Makassed.Api.Data;

namespace Makassed.Api.Repositories;

public class SqlMonitoringToolRepository : IMonitoringToolRepository
{
    private readonly MakassedDbContext _dbContext;

    public SqlMonitoringToolRepository(MakassedDbContext dbContext)
    {
        _dbContext = dbContext;
    }
}
