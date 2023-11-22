using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;

namespace Makassed.Api.Dependencies;

public static class SwaggerConfiguration
{
    public static IServiceCollection AddSwaggerConfiguration(IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();

        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new() { Title = "Makassed Api", Version = "v1" });
            options.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new OpenApiSecurityScheme
            {
                Name = "Authorization",
                Type = SecuritySchemeType.ApiKey,
                Scheme = JwtBearerDefaults.AuthenticationScheme,
                In = ParameterLocation.Header,
            });
            options.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Id = JwtBearerDefaults.AuthenticationScheme,
                            Type = ReferenceType.SecurityScheme,
                        },
                        Scheme = "Oauth2",
                        Name = JwtBearerDefaults.AuthenticationScheme, 
                        In = ParameterLocation.Header
                    },
                    new List<string>()
                },
            });
        }); 

        return services;
    }
}