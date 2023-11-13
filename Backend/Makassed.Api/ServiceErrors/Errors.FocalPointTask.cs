using ErrorOr;

namespace Makassed.Api.ServiceErrors;

public abstract partial class Errors
{
    public class FocalPointTask
    {
        public static Error NotFound => Error.NotFound(
            code: "FocalPointTask.NotFound",
            description: "Focal point task is not found."
        );
    }
}