using Makassed.Api.Models.Domain;
using Sieve.Services;

namespace Makassed.Api.Data.Configuration.Sieve;

public class ChapterSieveConfiguration : ISieveConfiguration
{
    public void Configure(SievePropertyMapper mapper)
    {
        mapper.Property<Chapter>(c => c.Name)
            .CanFilter()
            .CanSort();

        mapper.Property<Chapter>(c => c.EnableState)
            .CanFilter();
    }
}