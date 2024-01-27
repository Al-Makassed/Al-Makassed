using ErrorOr;
using Makassed.Api.Models.Domain;

namespace Makassed.Api.Repositories.Interfaces;

public interface IAnnouncementRepository
{
    Task<Announcement?> GetAnnouncementById(Guid id);

    Task<Announcement> CreateAnnouncement(Announcement request);
}
