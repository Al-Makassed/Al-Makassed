namespace Makassed.Api.Dependencies;

public static class CorsConfiguration
{
    public static IServiceCollection AddMakassedCors(IServiceCollection services, IConfiguration configuration)
    {
        //var allowedOrigins =
        //    configuration.GetSection("CorsAllowedOrigins").Get<string[]>()
        //    ?? new[] { "*" };

        //services.AddCors(options =>
        //{
        //    options.AddDefaultPolicy(builder =>
        //    {
        //        builder
        //            .AllowAnyOrigin() // Change this later for security
        //            .AllowAnyHeader()
        //            .AllowAnyMethod();
        //    });
        //});

        // Add CORS services
        services.AddCors(options =>
        {
            options.AddPolicy("AllowAll",
                builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
        });

        return services;
    }
}