using Makassed.Api.Repositories.Interfaces;

namespace Makassed.Api.Services.Announcements;

public class AnnouncementService : IAnnouncementService
{
    private readonly IAnnouncementRepository _repository;

    public AnnouncementService(IAnnouncementRepository repository)
    {
        this._repository = repository;
    }
}
