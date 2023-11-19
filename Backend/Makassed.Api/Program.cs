using Makassed.Api;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
{

    builder.Services.AddControllers();

    builder.Services.RegisterMakassedDependencies(builder.Configuration);

}

var app = builder.Build();
{
    // Configure the HTTP request pipeline.
    app.UseSwagger();
    app.UseSwaggerUI();


    #region ErrorOrSetUp
    app.UseExceptionHandler("/error");
    #endregion

    app.UseHttpsRedirection();

    app.UseCors(); // Cross-Origin Resource Sharing

    app.UseAuthentication();

    app.UseAuthorization();

    // Serve static files from the "Files" directory under the "/Files" URL path.
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Files")),
        RequestPath = "/Files"
    });

    // You can add another middleware registration in case you need to expose another physical directory to another RequestPath
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Avatars")),
        RequestPath = "/Avatars"  // specifies the URL path at which the static files will be served.
    });

    app.MapControllers();

    app.Run();
}

