namespace Makassed.Api.Dependencies;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using UserManagement.Service.Models.Domain;

public static class MailKitEmailConfiguration
{
    public static IServiceCollection AddEmailService(IServiceCollection services, IConfiguration configuration)
    {
        var emailConfiguration = configuration.GetSection("EmailConfiguration").Get<EmailConfiguration>();

        services.AddSingleton(emailConfiguration!);

        return services;
    }
}
