using Makassed.Api.Data;
using Sieve.Models;
using Sieve.Services;

namespace Makassed.Api.Dependencies;

public static class SieveConfiguration
{
    public static IServiceCollection AddSieve(IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<ISieveProcessor, MakassedSieveProcessor>();

        services.Configure<SieveOptions>(configuration.GetSection("Sieve"));

        return services;
    }
}
