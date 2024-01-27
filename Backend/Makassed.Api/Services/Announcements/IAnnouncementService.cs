using ErrorOr;
using Makassed.Api.Models.Domain;
using Makassed.Contracts.Announcement;

namespace Makassed.Api.Services.Announcements;

public interface IAnnouncementService
{
    GetAnnouncementResponse MapToResponse(Announcement announcement);

    Task<ErrorOr<GetAnnouncementResponse>> GetAnnouncementById(Guid id);

    Task<ErrorOr<GetAnnouncementResponse>> CreateAnnouncement(Announcement request);
}
