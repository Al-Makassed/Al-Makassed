using Makassed.Api.Data;
using Makassed.Api.Mappings;
using Makassed.Api.Repositories;
using Makassed.Api.Services.Chapters;
using Makassed.Api.Services.Policy;
using Microsoft.EntityFrameworkCore;
using Makassed.Api;

var builder = WebApplication.CreateBuilder(args);
{
    // Add services to the container.
    builder.Services
        .AddControllers();

    builder.Services.AddMaqasidValidators();

    #region AutoMapper/s Injection
    builder.Services.AddAutoMapper(typeof(AutoMapperProfile));
    #endregion

    #region DbContext/s Injection
    builder.Services.AddDbContext<MakassedDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("MakassedConnectionString")));
    #endregion

    #region Dependency Injection
    builder.Services.AddScoped<IChapterRepository, SqlChapterRepository>();
    builder.Services.AddScoped<IPolicyRepository, SqlPolicyRepository>();
    builder.Services.AddScoped<IChapterService, ChapterService>();
    builder.Services.AddScoped<IPolicyService, PolicyService>();
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

    app.UseAuthorization();

    app.MapControllers();

    app.Run();
}

