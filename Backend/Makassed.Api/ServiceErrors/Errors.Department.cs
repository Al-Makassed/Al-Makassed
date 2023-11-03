using ErrorOr;

namespace Makassed.Api.ServiceErrors;

public abstract partial class Errors
{
    public class Department
    {
        public static Error NotFound => Error.NotFound(
            code: "User.Department.NotFound",
            description: "Department is not found."
        );

        public static Error AlreadyExists => Error.Validation(
            code: "User.Department.AlreadyExists",
            description: "Department already exists."
        );

        public static Error DoesNotBelong => Error.Validation(
            code: "User.Department.DoesNotBelong",
            description: "User does not belong to department."
        );

        public static Error InvalidHeadRole => Error.Validation(
            code: "User.Department.InvalidHeadRole",
            description: "Normal user cannot be the head of department."
        );
    }
}