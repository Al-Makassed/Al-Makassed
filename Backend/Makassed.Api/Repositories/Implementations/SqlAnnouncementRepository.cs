using Makassed.Api.Data;
using Makassed.Api.Models.Domain;
using Makassed.Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore; // Ensure this using directive for FirstOrDefaultAsync


namespace Makassed.Api.Repositories.Implementations;

public class SqlAnnouncementRepository : IAnnouncementRepository
{
    private readonly MakassedDbContext _dbContext;

    public SqlAnnouncementRepository(MakassedDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Announcement?> GetAnnouncementById(Guid id)
    {
        return await _dbContext.Announcements
            .Include(a => a.Creator)
            .FirstOrDefaultAsync(a => a.Id == id);
    }

    public async Task<Announcement> CreateAnnouncement(Announcement request)
    {
        var x = await _dbContext.Announcements.AddAsync(request);
        await _dbContext.SaveChangesAsync();

        var y = await GetAnnouncementById(x.Entity.Id);

        return y!;
    }
}