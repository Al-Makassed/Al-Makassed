namespace Makassed.Api.Utilities
{
    public class Helpers
    {
        public static bool IsRunningOnSpecificUrl(IApplicationBuilder app, string url)
        {
            var request = app.ApplicationServices.GetRequiredService<IHttpContextAccessor>()?.HttpContext?.Request;

            return request?.IsHttps == true && request.Host.Value == new Uri(url).Host && request.Path.StartsWithSegments(new Uri(url).AbsolutePath);
        }
    }
}
