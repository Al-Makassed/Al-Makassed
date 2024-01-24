using Makassed.Api.Models.Domain;
using Sieve.Services;

namespace Makassed.Api.Data.Configuration.Sieve;

public class PolicyUserSieveConfiguration : ISieveConfiguration
{
    public void Configure(SievePropertyMapper mapper)
    {
        mapper.Property<PolicyUser>(pu => pu.PolicyId)
              .CanFilter()
              .CanSort();

        mapper.Property<PolicyUser>(pu => pu.UserId)
              .CanFilter()
              .CanSort();

        mapper.Property<PolicyUser>(pu => pu.ReadingState)
              .CanFilter()
              .CanSort();

        mapper.Property<PolicyUser>(pu => pu.Policy.CreatedAt)
              .CanFilter()
              .CanSort();

        mapper.Property<PolicyUser>(pu => pu.Policy.Name)
              .CanFilter()
              .CanSort();

        mapper.Property<PolicyUser>(pu => pu.Policy.Id)
              .CanFilter()
              .CanSort();

        mapper.Property<PolicyUser>(pu => pu.Policy.Chapter.Name)
              .CanFilter()
              .CanSort();
    }
}
