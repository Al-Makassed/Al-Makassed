using Makassed.Api.Data;
using Makassed.Api.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace Makassed.Api.Repositories;

public class SqlMonitoringToolRepository : IMonitoringToolRepository
{
    private readonly MakassedDbContext _dbContext;

    public SqlMonitoringToolRepository(MakassedDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<MonitoringTool>> GetMonitoringToolsAsync()
    {
        return await _dbContext.MonitoringTools.ToListAsync();
    }

    public async Task<List<MonitoringTool>?> GetFocalPointMonitoringToolsAsync(string focalPointId)
    {
        var fpDepartment = await _dbContext.Departments.FirstOrDefaultAsync(d => d.HeadId == focalPointId);
        
        if(fpDepartment is null)
            return null;

        return await _dbContext.MonitoringTools.Where(mt => mt.Departments.Contains(fpDepartment)).ToListAsync();
    }

    public async Task<MonitoringTool?> GetFocalPointByIdAsync(Guid id)
    {
        return await _dbContext.MonitoringTools.FirstOrDefaultAsync(mt => mt.Id == id);
    }
}   