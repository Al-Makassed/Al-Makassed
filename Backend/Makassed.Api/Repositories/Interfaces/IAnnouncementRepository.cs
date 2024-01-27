using ErrorOr;
using Makassed.Api.Models.Domain;
using Sieve.Models;

namespace Makassed.Api.Repositories.Interfaces;

public interface IAnnouncementRepository
{
    Task<Announcement?> GetAnnouncementByIdAsync(Guid id);

    Task<Announcement> CreateAnnouncementAsync(Announcement request);

    Task<List<Announcement>> GetAnnouncementsAsync(SieveModel sieveModel);
}
