using Makassed.Api.Models.Domain;
using Sieve.Services;

namespace Makassed.Api.Data.Configuration.Sieve;

public class DependencySieveConfiguration : ISieveConfiguration
{
    public void Configure(SievePropertyMapper mapper)
    {
        mapper.Property<Dependency>(d => d.Code).CanFilter().CanSort();
        mapper.Property<Dependency>(d => d.Name).CanFilter().CanSort();
        mapper.Property<Dependency>(d => d.Type).CanFilter().CanSort();
    }
}