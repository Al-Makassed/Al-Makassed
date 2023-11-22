using Makassed.Api.Data;
using Makassed.Api.Models.DTO;
using Makassed.Contracts.Enums;
using Microsoft.EntityFrameworkCore;

namespace Makassed.Api.Repositories;

public class SqlApprovalRequestRepository : IApprovalRequestRepository
{
    private readonly MakassedDbContext _dbContext;

    public SqlApprovalRequestRepository(MakassedDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<RequestDto>> GetApprovalRequestsAsync()
    {
        var monitoringToolRequests = await _dbContext.MonitoringTools
        .Where(mt => mt.IsApproved == false)
        .Select(mt => new RequestDto
        {
            Title = mt.Name,
            RequesterId = mt.CreatorId,
            CreatedAt = mt.CreatedAt,
            EntityId = mt.Id,
            EntityType = RequestEntityType.MonitoringTool,
            Info = new
            {
                mt.Id,
                mt.Name,
                mt.Description,
                Fields = mt.Fields.Select(f => new { f.Id, f.Content })
            }
        })
        .ToListAsync();

        var policyRequests = await _dbContext.Policies
            .Where(p => p.IsApproved == false)
            .Select(p => new RequestDto
            {
                Title = p.Name,
                RequesterId = p.CreatorId,
                CreatedAt = p.CreatedAt,
                EntityId = p.Id,
                EntityType = RequestEntityType.Policy,
                Info = new 
                {
                    p.Id,
                    p.Code,
                    p.Name,
                    p.PdfUrl,
                    p.Summary,
                    p.PageCount,
                    p.EstimatedTimeInMin,
                    p.ChapterId
                }
            })
            .ToListAsync();

        var dependencyRequests = await _dbContext.Dependencies
            .Where(d => d.IsApproved == false)
            .Select(d => new RequestDto
            {
                Title = d.Name,
                RequesterId = d.CreatorId,
                CreatedAt = d.CreatedAt,
                EntityId = d.Id,
                EntityType = RequestEntityType.Dependency,
                Info = new
                {
                    d.Id,
                    d.Code,
                    d.Name,
                    d.Type,
                    d.PdfUrl,
                    d.PagesCount,
                    d.EstimatedTimeInMin,
                    d.PolicyId
                }
            })
            .ToListAsync();

        var requests = monitoringToolRequests
            .Union(policyRequests)
            .Union(dependencyRequests)
            .OrderBy(r => r.CreatedAt)
            .ToList();

        return requests;
    }
}