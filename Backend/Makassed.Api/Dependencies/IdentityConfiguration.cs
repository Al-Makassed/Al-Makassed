namespace Makassed.Api.Dependencies;

using Makassed.Api.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

public static class IdentityConfiguration
{
    public static IServiceCollection AddIdentity(IServiceCollection services)
    {
        services.AddIdentityCore<IdentityUser>()
             .AddRoles<IdentityRole>()
             .AddTokenProvider<DataProtectorTokenProvider<IdentityUser>>("Makassed")
             .AddEntityFrameworkStores<MakassedAuthenticationDbContext>()
             .AddDefaultTokenProviders()
             .AddSignInManager<SignInManager<IdentityUser>>();

        services.Configure<IdentityOptions>(options =>
        {
            options.Password.RequireDigit = false;
            options.Password.RequireLowercase = false;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireUppercase = false;
            options.Password.RequiredLength = 8;
            options.Password.RequiredUniqueChars = 1;
        }
        );

        return services;
    }
}