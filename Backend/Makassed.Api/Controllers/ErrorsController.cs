using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace Makassed.Api.Controllers;

public class ErrorsController : ApiController
{
    [HttpGet("/error")]
    public IActionResult Error()
    {
        // Get the exception details, if available
        var exceptionFeature = HttpContext.Features.Get<IExceptionHandlerFeature>();
        var exception = exceptionFeature?.Error;

        return Problem(detail: exception?.Message);
    }
}
