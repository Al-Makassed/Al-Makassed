using Makassed.Api;
using Makassed.Api.Mappings;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
{

    builder.Services.AddControllers();

    builder.Services.AddMaqasidValidators();

    builder.Services.AddCors();
   
    builder.Services.AddDbContexts(builder.Configuration);

    builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

    builder.Services.AddApplicationServices();

    builder.Services.AddAndConfigureIdentity();

    builder.Services.AddAuthenticationService(builder.Configuration);

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

    app.UseAuthentication();

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

