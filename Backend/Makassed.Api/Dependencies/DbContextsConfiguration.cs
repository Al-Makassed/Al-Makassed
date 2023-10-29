namespace Makassed.Api.Dependencies;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Makassed.Api.Data;
using Microsoft.EntityFrameworkCore;

public static class DbContextsConfiguration
{
    public static IServiceCollection AddDbContexts(IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<MakassedDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("MakassedConnectionString")));

        return services;
    }
}
