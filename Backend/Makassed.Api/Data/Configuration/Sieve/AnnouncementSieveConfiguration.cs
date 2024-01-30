using Makassed.Api.Models.Domain;
using Sieve.Services;

namespace Makassed.Api.Data.Configuration.Sieve;

public class AnnouncementSieveConfiguration : ISieveConfiguration
{
    public void Configure(SievePropertyMapper mapper)
    {
        mapper.Property<Announcement>(a => a.IsPinned)
            .CanFilter();

        mapper.Property<Announcement>(a => a.CreatedAt)
            .CanFilter()
            .CanSort();

        mapper.Property<Announcement>(a => a.CreatorId)
            .CanFilter();

        mapper.Property<Announcement>(a => a.Body)
            .CanFilter();
    }
}

