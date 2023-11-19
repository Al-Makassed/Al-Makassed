using Makassed.Api.Models.Domain;
using Sieve.Services;

namespace Makassed.Api.Data.Configuration.Sieve;

public class MonitoringToolSieveConfiguration : ISieveConfiguration
{
    public void Configure(SievePropertyMapper mapper)
    {
        mapper.Property<MonitoringTool>(mt => mt.Name).CanFilter().CanSort();
        mapper.Property<MonitoringTool>(mt => mt.LastModified).CanFilter().CanSort();
    }
}