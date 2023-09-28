using Makassed.Api.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace BuberBreakfast.Api.Controllers
{
    public class ErrorsController : ApiController
    {
        [HttpGet("/error")]
        public IActionResult Error()
        {
            return Problem();
        }
    }
}
