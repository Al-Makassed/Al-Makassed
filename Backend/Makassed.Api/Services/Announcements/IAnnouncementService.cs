using ErrorOr;
using Makassed.Api.Models.Domain;
using Makassed.Contracts.Announcement;
using Microsoft.AspNetCore.Mvc;
using Sieve.Models;

namespace Makassed.Api.Services.Announcements;

public interface IAnnouncementService
{
    GetAnnouncementResponse MapToResponse(Announcement announcement);

    Task<ErrorOr<GetAnnouncementResponse>> GetAnnouncementByIdAsync(Guid id);

    Task<ErrorOr<GetAnnouncementResponse>> CreateAnnouncementAsync(Announcement request);

    Task<List<GetAnnouncementResponse>> GetAnnouncementsAsync(SieveModel sieveModel);
}
