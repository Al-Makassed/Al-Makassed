using Makassed.Api.Repositories.Implementations;
using Makassed.Api.Repositories.Interfaces;

namespace Makassed.Api.Dependencies;

using Microsoft.Extensions.DependencyInjection;
using Services.Authentication;
using Services.Chapters;
using Services.Policies;
using Services.PolicyDependencies;
using Makassed.Email.Service.Services;
using Services.MonitoringTools.Fields;
using Services.Users.Departments;
using Services.MonitoringTools;
using Services.FocalPointTasks;
using Services.Users;
using Services.Storage;
using Services.ApprovalRequests;

public static class ApplicationServicesConfiguration
{
    public static IServiceCollection RegisterMakassedServices(IServiceCollection services)
    {
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

        services.AddScoped<IUserService, UserService>();

        services.AddScoped<ILocalFileStorageService, LocalFileStorageService>();
        services.AddScoped<ICloudinaryStorageService, CloudinaryStorageService>();

        services.AddScoped<IApprovalRequestService, ApprovalRequestService>();
        services.AddScoped<IApprovalRequestRepository, SqlApprovalRequestRepository>();

        return services;
    }
}