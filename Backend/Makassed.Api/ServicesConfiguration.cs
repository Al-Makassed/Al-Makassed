using FluentValidation;
using System.Reflection;
using System.Text;
using FluentValidation.AspNetCore;
using Makassed.Api.Data;
using Makassed.Api.Repositories;
using Makassed.Api.Services.Chapters;
using Makassed.Api.Services.Policies;
using Makassed.Api.Services.PolicyDependencies;
using Makassed.Api.Services.SharedServices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using UserManagement.Service.Models.Domain;
using UserManagement.Service.Services.Email;
using UserManagement.Service.Services.Message;

namespace Makassed.Api;

public static class ServicesConfiguration
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

        services.AddScoped<IEmailService, EmailService>();
        services.AddScoped<IMessageService, MimeMessageService>();
        
        return services;
    }

    public static IServiceCollection AddAuthenticationService(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = configuration["Jwt:Issuer"],
                        ValidAudience = configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!)) 
                    });

        return services;
    }
    
    public static IServiceCollection AddAndConfigureIdentity(this IServiceCollection services)
    {
        services.AddIdentityCore<IdentityUser>()
            .AddRoles<IdentityRole>()
            .AddTokenProvider<DataProtectorTokenProvider<IdentityUser>>("Makassed")
            .AddEntityFrameworkStores<MakassedAuthenticationDbContext>()
            .AddDefaultTokenProviders();

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

    public static IServiceCollection AddDbContexts(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<MakassedDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("MakassedConnectionString")));
        services.AddDbContext<MakassedAuthenticationDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("MakassedConnectionString")));
        
        return services;
    }

    public static IServiceCollection AddEmailConfiguration(this IServiceCollection services, IConfiguration configuration)
    {
        var emailConfig = configuration.GetSection("EmailConfiguration").Get<EmailConfiguration>();

        services.AddSingleton(emailConfig!);

        return services;
    }

    public static IServiceCollection AddWoof(this IServiceCollection services){
        return services;
    }
    
    public static IServiceCollection AddQuack(this IServiceCollection services)
    {
        return services;
    }
}