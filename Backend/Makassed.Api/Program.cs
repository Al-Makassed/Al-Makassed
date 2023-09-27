using FluentValidation;
using FluentValidation.AspNetCore;
using Makassed.Api.Data;
using Makassed.Api.Validators;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);
{
    // Add services to the container.
    builder.Services.AddControllers()
        // FluentValidation Setup
        .AddFluentValidation(v => 
        v.RegisterValidatorsFromAssembly(Assembly.GetExecutingAssembly()));

    builder.Services.AddValidatorsFromAssemblyContaining<ChapterValidator>();

    #region AutoMapper/s Injection
    #endregion

    #region DbContext/s Injection
    builder.Services.AddDbContext<MakassedDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("MAKConnectionString")));
    #endregion

    #region Dependency Injection

    #endregion

    #region Swagger Config
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
    #endregion
}

var app = builder.Build();
{
    // Configure the HTTP request pipeline.

    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();

    app.UseAuthorization();

    app.MapControllers();

    app.Run();
}

