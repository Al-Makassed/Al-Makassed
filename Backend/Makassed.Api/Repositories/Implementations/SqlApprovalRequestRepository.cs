using Makassed.Api.Data;
using Makassed.Api.Models.DTO;
using Makassed.Api.Repositories.Interfaces;
using Makassed.Contracts.Enums;
using Microsoft.EntityFrameworkCore;

namespace Makassed.Api.Repositories.Implementations;

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
        .Include(mt => mt.Creator)
        .Where(mt => mt.IsApproved == false)
        .Select(mt => new RequestDto
        {
            Title = mt.Name,
            RequesterId = mt.CreatorId,
            RequesterUserName = mt.Creator.UserName!,
            RequesterFullName = mt.Creator.FullName,
            RequesterAvatarUrl = mt.Creator.AvatarUrl,
            CreatedAt = mt.CreatedAt,
            EntityId = mt.Id,
            EntityType = RequestEntityType.MonitoringTool,
        })
        .ToListAsync();

        var policyRequests = await _dbContext.Policies
            .Where(p => p.IsApproved == false)
            .Select(p => new RequestDto
            {
                Title = p.Name,
                RequesterId = p.CreatorId,
                RequesterUserName = p.Creator.UserName!,
                RequesterFullName = p.Creator.FullName,
                RequesterAvatarUrl = p.Creator.AvatarUrl,
                CreatedAt = p.CreatedAt,
                EntityId = p.Id,
                EntityType = RequestEntityType.Policy,
                Info = new
                {
                    p.ChapterId
                }
            })
            .ToListAsync();

        var dependencyRequests = await _dbContext.Dependencies
            .Include(d => d.Creator)
            .Where(d => d.IsApproved == false)
            .Select(d => new RequestDto
            {
                Title = d.Name,
                RequesterId = d.CreatorId,
                RequesterUserName = d.Creator.UserName!,
                RequesterFullName = d.Creator.FullName,
                RequesterAvatarUrl = d.Creator.AvatarUrl,
                CreatedAt = d.CreatedAt,
                EntityId = d.Id,
                EntityType = RequestEntityType.Dependency,
                Info = new
                {
                    d.PolicyId,
                    d.Policy.ChapterId
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