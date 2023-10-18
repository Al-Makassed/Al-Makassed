using Makassed.Api;
using Makassed.Api.Data;
using Makassed.Api.Mappings;
using Makassed.Api.Repositories;
using Makassed.Api.Services.Chapters;
using Makassed.Api.Services.Policies;
using Makassed.Api.Services.PolicyDependencies;
using Makassed.Api.Services.SharedServices;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
{

    builder.Services.AddControllers();

    builder.Services.AddMaqasidValidators();

    builder.Services.AddCors();

    #region AutoMapper/s Injection
    builder.Services.AddAutoMapper(typeof(AutoMapperProfile));
    #endregion

    #region DbContext/s Injection
    builder.Services.AddDbContext<MakassedDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("MakassedConnectionString")));
    #endregion

    #region Dependency Injection

    builder.Services.AddScoped<ISharedService ,SharedService>();
    builder.Services.AddScoped<IChapterService, ChapterService>();
    builder.Services.AddScoped<IPolicyService, PolicyService>();
    builder.Services.AddScoped<IPolicyDependencyService, PolicyDependencyService>();
    
    builder.Services.AddScoped<IChapterRepository, SqlChapterRepository>();
    builder.Services.AddScoped<IPolicyRepository, SqlPolicyRepository>();
    builder.Services.AddScoped<IPolicyDependencyRepository, SqlPolicyDependencyRepository>();
    #endregion

    #region Swagger Config
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
    #endregion
}

var app = builder.Build();
{
    // Configure the HTTP request pipeline.

    //if (
    //    app.Environment.IsDevelopment() ||
    //    Helpers.IsRunningOnSpecificUrl(app, "https://maqasid.azurewebsites.net/api")
    //    )
    //{
    app.UseSwagger();
    app.UseSwaggerUI();
    //}

    #region ErrorOrSetUp
    app.UseExceptionHandler("/error");
    #endregion

    app.UseHttpsRedirection();
    
    app.ConfigureCores();

    app.UseAuthorization();
    
    // Serve static files from the "Files" directory under the "/Files" URL path.
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Files")),
        RequestPath = "/Files"
    });

    app.MapControllers();

    app.Run();
}

