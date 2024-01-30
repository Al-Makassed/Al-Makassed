using AutoMapper;
using Makassed.Api.Models.Domain;
using Makassed.Api.Services.Announcements;
using Makassed.Contracts.Announcement;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sieve.Models;

namespace Makassed.Api.Controllers;

public class AnnouncementsController : ApiController
{
    private readonly IAnnouncementService _service;
    private readonly IMapper _mapper;

    public AnnouncementsController(IAnnouncementService service, IMapper mapper)
    {
        _service = service;
        _mapper = mapper;
    }

    // Get all a announcements
    [HttpGet]
    [ProducesResponseType(typeof(GetAnnouncementResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize]
    public async Task<IActionResult> GetAnnouncements([FromQuery] SieveModel sieveModel)
    {
        var announcements = await _service.GetAnnouncementsAsync(sieveModel);

        return Ok(announcements);
    }


    // Get announcement
    [HttpGet("{id:guid}")]
    [ProducesResponseType(typeof(GetAnnouncementResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize]
    public async Task<IActionResult> GetAnnouncement(Guid id)
    {
        var result = await _service.GetAnnouncementByIdAsync(id);

        return result.Match(
            Ok,
            Problem
        );
    }

    // Create a new announcement
    [HttpPost]
    [ProducesResponseType(typeof(GetAnnouncementResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Authorize(Roles = "Admin, Sub-Admin")]
    public async Task<IActionResult> CreateAnnouncement(CreateAnnouncementRequest request)
    {
        var announcement = _mapper.Map<Announcement>(request);

        var result = await _service.CreateAnnouncementAsync(announcement);

        return result.Match(
            announcement => CreatedAtAction(nameof(GetAnnouncement), new { id = announcement.Id }, announcement),

            errors => Problem(errors)
        );
    }
}
