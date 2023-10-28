namespace Makassed.Api;

public static class Configuration
{
    public static void ConfigureCores(this IApplicationBuilder app)
    {
        app.UseCors(options => 
            options.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
        );
    }
}