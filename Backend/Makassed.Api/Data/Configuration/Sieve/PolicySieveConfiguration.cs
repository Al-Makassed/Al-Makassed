using Makassed.Api.Models.Domain;
using Sieve.Services;

namespace Makassed.Api.Data.Configuration.Sieve;

public class PolicySieveConfiguration : ISieveConfiguration
{
    public void Configure(SievePropertyMapper mapper)
    {
        mapper.Property<Policy>(p => p.Name).CanFilter().CanSort();
        mapper.Property<Policy>(p => p.Code).CanFilter().CanSort();
        mapper.Property<Policy>(p => p.ChapterId).CanFilter();
    }
}