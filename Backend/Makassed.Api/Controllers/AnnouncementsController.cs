using Makassed.Api.Services.Announcements;

namespace Makassed.Api.Controllers;

public class AnnouncementsController : ApiController
{
    private readonly IAnnouncementService _service;

    public AnnouncementsController(IAnnouncementService service)
    {
        this._service = service;
    }
}
