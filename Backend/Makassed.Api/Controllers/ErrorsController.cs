using Microsoft.AspNetCore.Mvc;

namespace Makassed.Api.Controllers;

public class ErrorsController : ApiController
{
    [HttpGet("/error")]
    public IActionResult Error()
    {
        return Problem();
    }
}
