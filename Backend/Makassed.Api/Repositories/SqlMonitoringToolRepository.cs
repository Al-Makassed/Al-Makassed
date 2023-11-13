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

    public async Task<MonitoringTool?> GetMonitoringToolByIdAsync(Guid id)
    {
        return await _dbContext.MonitoringTools
            .Include(mt => mt.Fields)
            .Include(mt => mt.FocalPointTasks)
            .ThenInclude(fpt => fpt.Department)
            .FirstOrDefaultAsync(mt => mt.Id == id);
    }

    public async Task<MonitoringTool?> CreateMonitoringToolAsync(MonitoringTool monitoringTool)
    {
        var existingMonitoringTool = await _dbContext.MonitoringTools.FirstOrDefaultAsync(mt => mt.Name == monitoringTool.Name);

        if (existingMonitoringTool is not null)
            return null;

        monitoringTool.LastModified = DateTime.UtcNow;

        await _dbContext.MonitoringTools.AddAsync(monitoringTool);
        await _dbContext.SaveChangesAsync();

        return monitoringTool;
    }

    public async Task<MonitoringTool?> UpdateMonitoringToolAsync(Guid id, MonitoringTool monitoringTool)
    {
        var existingMonitoringTool = await _dbContext.MonitoringTools
            .Include(mt => mt.FocalPointTasks)
            .Include(mt => mt.Fields)
            .FirstOrDefaultAsync(mt => mt.Id == id);

        if (existingMonitoringTool is null)
            return null;

        existingMonitoringTool.Name = monitoringTool.Name;
        existingMonitoringTool.Description = monitoringTool.Description;
        existingMonitoringTool.LastModified = DateTime.UtcNow;

        existingMonitoringTool.FocalPointTasks.Clear();
        existingMonitoringTool.FocalPointTasks = monitoringTool.FocalPointTasks;

        existingMonitoringTool.Fields.Clear();
        existingMonitoringTool.Fields.AddRange(monitoringTool.Fields);

        await _dbContext.SaveChangesAsync();

        return existingMonitoringTool;
    }

    public async Task<MonitoringTool?> DeleteMonitoringToolAsync(Guid id)
    {
        var existingMonitoringTool = await _dbContext.MonitoringTools
            .Include(mt => mt.Fields)
            .Include(mt => mt.FocalPointTasks)
            .ThenInclude(fpt => fpt.Department)
            .FirstOrDefaultAsync(mt => mt.Id == id);

        if (existingMonitoringTool is null)
            return null;

        _dbContext.MonitoringTools.Remove(existingMonitoringTool);
        await _dbContext.SaveChangesAsync();

        return existingMonitoringTool;
    }
}   