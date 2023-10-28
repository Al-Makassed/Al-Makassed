using Makassed.Api.Dependencies;
using Makassed.Api.Mappings;

namespace Makassed.Api;

public static class DependencyInjection
{
    public static IServiceCollection RegisterMakassedDependencies(this IServiceCollection services, IConfiguration configuration)
    {
        CorsConfiguration.AddMakassedCors(services, configuration);

        FluentValidationConfiguration.AddMakassedFluentValidation(services);

        ApplicationServicesConfiguration.RegisterMakassedServices(services);

        AuthenticationServiceConfiguration.AddJwtAuthentication(services, configuration);
        
        IdentityConfiguration.AddIdentity(services);
        
        DbContextsConfiguration.AddDbContexts(services, configuration);
        
        MailKitEmailConfiguration.AddEmailService(services, configuration);

        SwaggerConfiguration.AddSwaggerConfiguration(services);

        services.AddAutoMapper(typeof(AutoMapperProfile));

        return services;
    }
}
