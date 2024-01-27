using Makassed.Api.Models.Domain;
using Sieve.Services;

namespace Makassed.Api.Data.Configuration.Sieve;

public class DependencyUserSieveConfiguration : ISieveConfiguration
{
    public void Configure(SievePropertyMapper mapper)
    {
        mapper.Property<DependencyUser>(du => du.DependencyId)
              .CanFilter()
              .CanSort();

        mapper.Property<DependencyUser>(du => du.ReadingState)
              .CanFilter()
              .CanSort();

        mapper.Property<DependencyUser>(du => du.Dependency)
              .CanFilter()
              .CanSort();

        mapper.Property<DependencyUser>(du => du.Dependency.Policy.Id)
              .CanFilter()
              .CanSort();

        mapper.Property<DependencyUser>(du => du.Dependency.Policy.Name)
             .CanFilter()
             .CanSort();

        mapper.Property<DependencyUser>(du => du.LastAccessed)
              .CanFilter()
              .CanSort();
    }
}
