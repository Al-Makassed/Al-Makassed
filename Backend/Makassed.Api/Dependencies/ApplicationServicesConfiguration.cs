namespace Makassed.Api.Dependencies;

using Microsoft.Extensions.DependencyInjection;
using Makassed.Api.Repositories;
using Makassed.Api.Services.Authentication;
using Makassed.Api.Services.Chapters;
using Makassed.Api.Services.Policies;
using Makassed.Api.Services.PolicyDependencies;
using Makassed.Api.Services.SharedServices;
using UserManagement.Service.Services.Email;
using Makassed.Api.Services.MonitoringTools.Fields;
using Makassed.Api.Services.Users.Departments;
using Makassed.Api.Services.MonitoringTools;
using Makassed.Api.Services.FocalPointTasks;

public static class ApplicationServicesConfiguration
{
    public static IServiceCollection RegisterMakassedServices(IServiceCollection services)
    {
        services.AddScoped<ISharedService, SharedService>();
        services.AddScoped<IChapterService, ChapterService>();
        services.AddScoped<IPolicyService, PolicyService>();
        services.AddScoped<IPolicyDependencyService, PolicyDependencyService>();

        services.AddScoped<IChapterRepository, SqlChapterRepository>();
        services.AddScoped<IPolicyRepository, SqlPolicyRepository>();
        services.AddScoped<IPolicyDependencyRepository, SqlPolicyDependencyRepository>();


        services.AddScoped<IMakassedEmailService, SmtpMakassedEmailService>();
        services.AddScoped<IAuthenticationService, AuthenticationService>();
        services.AddScoped<ITokenService, TokenService>();

        services.AddScoped<IMonitoringToolRepository, SqlMonitoringToolRepository>();
        services.AddScoped<IMonitoringToolService, MonitoringToolService>();
        services.AddScoped<IFieldService, FieldService>();
        services.AddScoped<IFieldRepository, SqlFieldRepository>();

        services.AddScoped<IDepartmentService, DepartmentService>();
        services.AddScoped<IDepartmentRepository, SqlDepartmentRepository>();

        services.AddScoped<ISubmissionRepository, SqlSubmissionRepository>();

        services.AddScoped<IFocalPointTaskService, FocalPointTaskService>();

        services.AddScoped<IUnitOfWork, UnitOfWork>();

        return services;
    }
}
