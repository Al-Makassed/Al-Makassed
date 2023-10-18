using FluentValidation;
using System.Reflection;
using FluentValidation.AspNetCore;
using Makassed.Api.Repositories;
using Makassed.Api.Services.Chapters;
using Makassed.Api.Services.Policies;
using Makassed.Api.Services.PolicyDependencies;
using Makassed.Api.Services.SharedServices;

namespace Makassed.Api;

public static class DependencyInjection
{
    public static IServiceCollection AddMaqasidValidators(this IServiceCollection services)
    {
        // Add the `FluentValidation package` services to the DI container
        services
            .AddFluentValidationAutoValidation()
            .AddFluentValidationClientsideAdapters();
        
        // Get all types in the assembly that implement AbstractValidator
        var validatorTypes = Assembly.GetCallingAssembly().GetTypes()
            .Where(t => t.BaseType != null && t.BaseType.IsGenericType &&
                        t.BaseType.GetGenericTypeDefinition() == typeof(AbstractValidator<>));

        // Register each validator
        foreach (var validatorType in validatorTypes)
        {
            // Get the generic argument of AbstractValidator<>
            var targetType = validatorType.BaseType?.GetGenericArguments().FirstOrDefault();
            if (targetType != null)
            {
                // Register the validator with the specific type it validates
                services.AddScoped(typeof(IValidator<>).MakeGenericType(targetType), validatorType);
            }
        }
        
        return services;
    }

    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<ISharedService ,SharedService>();
        services.AddScoped<IChapterService, ChapterService>();
        services.AddScoped<IPolicyService, PolicyService>();
        services.AddScoped<IPolicyDependencyService, PolicyDependencyService>();
    
        services.AddScoped<IChapterRepository, SqlChapterRepository>();
        services.AddScoped<IPolicyRepository, SqlPolicyRepository>();
        services.AddScoped<IPolicyDependencyRepository, SqlPolicyDependencyRepository>();
        
        return services;
    }
    
    public static IServiceCollection AddWoof(this IServiceCollection services)
    {
        return services;
    }
    
    public static IServiceCollection AddQuack(this IServiceCollection services)
    {
        return services;
    }
}
