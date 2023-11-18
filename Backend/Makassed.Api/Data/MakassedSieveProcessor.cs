using Microsoft.Extensions.Options;
using Sieve.Models;
using Sieve.Services;

namespace Makassed.Api.Data;

public class MakassedSieveProcessor : SieveProcessor
{
    public MakassedSieveProcessor(IOptions<SieveOptions> options) : base(options)
    {
    }

    protected override SievePropertyMapper MapProperties(SievePropertyMapper mapper)
    {
        return mapper.ApplyConfigurationsFromAssembly(typeof(MakassedSieveProcessor).Assembly);
    }
}