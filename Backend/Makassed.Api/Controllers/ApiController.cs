using ErrorOr;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Makassed.Api.Common.Http;

namespace Makassed.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ApiController : ControllerBase
{
    protected IActionResult Problem(List<Error> errors)
    {
        if (errors.Count is 0)
        {
            return Problem(); // No errors, return a generic problem
        }

        /**
         * If all errors are validation errors, call the ValidationProblem 
         * method which will return a 400 status code, plus a list of all
         * validation errors:
         */
        if (errors.All(error => error.Type == ErrorType.Validation))
        {
            return ValidationProblem(errors);
        }

        // `HttpContext.Items` Gets or sets a key/value collection that can be used to share data within the scope of this request.
        HttpContext.Items.Add(HttpContextItemKeys.Errors, errors);
        // 👆🏻 We will only return the first error to the client, however we store all errors in the HttpContext.Items dictionary for logging purposes.

        var firstError = errors.First();

        return Problem(firstError);
    }

    /// <summary>
    /// Custom method to generate an IActionResult representing a problem based on the provided Error object.
    /// </summary>
    /// <param name="error">The Error object containing information about the problem.</param>
    /// <returns>An IActionResult representing the problem with the appropriate status code and error title.</returns>
    private IActionResult Problem(Error error)
    {
        var statusCode = error.Type switch
        {
            ErrorType.Conflict => StatusCodes.Status409Conflict,
            ErrorType.NotFound => StatusCodes.Status404NotFound,
            ErrorType.Validation => StatusCodes.Status400BadRequest,
            ErrorType.Unauthorized => StatusCodes.Status401Unauthorized,
            _ => StatusCodes.Status500InternalServerError
        };

        // Now call the Problem method which comes from ControllerBase class:
        return Problem(statusCode: statusCode, title: error.Description);
    }

    /// <summary>
    /// Overrides the default ValidationProblem method to return a list of errors instead of a single error.
    /// </summary>
    /// <param name="errors">The list of errors to be added to the ModelStateDictionary.</param>
    /// <returns>An IActionResult representing the validation problem with the provided errors.</returns>
    private IActionResult ValidationProblem(List<Error> errors)
    {
        var modelStateDictionary = new ModelStateDictionary();

        errors.ForEach(error => modelStateDictionary.AddModelError(
                error.Code,
                error.Description));

        return ValidationProblem(modelStateDictionary);
    }
}
