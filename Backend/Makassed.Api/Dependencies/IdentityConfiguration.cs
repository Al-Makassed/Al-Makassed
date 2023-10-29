namespace Makassed.Api.Dependencies;

using Makassed.Api.Data;
using Makassed.Api.Models.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

public static class IdentityConfiguration
{
    public static IServiceCollection AddIdentity(IServiceCollection services)
    {
        services.AddIdentityCore<MakassedUser>()
             .AddRoles<IdentityRole>()
             .AddTokenProvider<DataProtectorTokenProvider<MakassedUser>>("Makassed")
             .AddEntityFrameworkStores<MakassedDbContext>()
             .AddDefaultTokenProviders()
             .AddSignInManager<SignInManager<MakassedUser>>();

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