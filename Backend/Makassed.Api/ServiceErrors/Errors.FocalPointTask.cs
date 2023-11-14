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

        public static Error NotAssignedToDepartment => Error.NotFound(
            code: "FocalPointTask.NotAssignedToDepartment",
            description: "Task is not assigned to this department."
        );
    }
}