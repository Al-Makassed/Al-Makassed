using Makassed.Api.Data;
using Makassed.Api.Models.Domain;
using Makassed.Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore; // Ensure this using directive for FirstOrDefaultAsync
using Sieve.Models;
using Sieve.Services;

namespace Makassed.Api.Repositories.Implementations;

public class SqlAnnouncementRepository : IAnnouncementRepository
{
    private readonly MakassedDbContext _dbContext;
    private readonly ISieveProcessor _sieveProcessor;

    public SqlAnnouncementRepository(MakassedDbContext dbContext, ISieveProcessor sieveProcessor)
    {
        _dbContext = dbContext;
        _sieveProcessor = sieveProcessor;
    }

    public async Task<Announcement?> GetAnnouncementByIdAsync(Guid id)
    {
        return await _dbContext.Announcements
            .Include(a => a.Creator)
            .FirstOrDefaultAsync(a => a.Id == id);
    }

    public async Task<Announcement> CreateAnnouncementAsync(Announcement request)
    {
        var announcement = await _dbContext.Announcements.AddAsync(request);
        await _dbContext.SaveChangesAsync();

        var announcementResponse = await GetAnnouncementByIdAsync(announcement.Entity.Id);

        return announcementResponse!;
    }

    public async Task<List<Announcement>> GetAnnouncementsAsync(SieveModel sieveModel)
    {
        var query = _dbContext.Announcements
            .Include(a => a.Creator)
            .AsNoTracking();

        var result = await _sieveProcessor.Apply(sieveModel, query).ToListAsync();

        return result;
    }
}