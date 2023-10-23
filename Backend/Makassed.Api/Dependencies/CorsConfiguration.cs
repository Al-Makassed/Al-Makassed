namespace Makassed.Api.Dependencies;

public static class CorsConfiguration
{
    public static IServiceCollection AddMakassedCors(IServiceCollection services, IConfiguration configuration)
    {
        var allowedOrigins =
            configuration.GetSection("CorsAllowedOrigins").Get<string[]>()
            ?? new string[] { "*" };

        services.AddCors(options =>
        {
            options.AddDefaultPolicy(builder =>
            {
                builder.WithOrigins(allowedOrigins)
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });

        return services;
    }
}
