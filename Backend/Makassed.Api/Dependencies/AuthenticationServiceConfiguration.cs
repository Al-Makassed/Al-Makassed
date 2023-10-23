namespace Makassed.Api.Dependencies;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;

public static class AuthenticationServiceConfiguration
{
    public static IServiceCollection AddJwtAuthentication(IServiceCollection services, IConfiguration configuration)
    {
        services.AddAuthentication(options =>
        {
            // JWT bearer authentication will be used to authenticate users when they access protected resources.
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            // If authentication fails, the application will challenge the user with JWT bearer authentication.
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            // This ensures that JWT bearer authentication is the primary method for authenticating and authorizing users in the application.
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        })

            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = configuration["Jwt:Issuer"],
                    ValidAudience = configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!))
                };
            });

        services.Configure<DataProtectionTokenProviderOptions>(options => options.TokenLifespan = TimeSpan.FromHours(2));

        return services;
    }
}
