using ErrorOr;
using Microsoft.AspNetCore.Identity;

namespace Makassed.Api.ServiceErrors;

public abstract partial class Errors
{
    public abstract partial class User
    {
        public static List<Error> SomethingWentWrong(IEnumerable<IdentityError> identityErrors)
        {
            var errors = new List<Error>();

            foreach (var identityError in identityErrors)
            {
                errors.Add(
                    Error.Validation(
                        code: identityError.Code,
                        description: identityError.Description
                    )
                );
            }

            return errors;
        }

        public static Error NotFound => Error.NotFound(
            code: "User.NotFound",
            description: "User is not found."            
        );

        public static Error WrongCredentials => Error.Unauthorized(
            code: "User.WrongCredentials",
            description: "One or more login credentials are invalid."
        );

        public static Error AlreadyExists => Error.Conflict(
            code: "User.AlreadyExists",
            description: "User already exists."
        );

        public static Error CreateFailed => Error.Conflict(
            code: "User.CreateFailed",
            description: "User creation failed."
        );

        public static Error EmailAlreadyExists => Error.Conflict(
            code: "User.EmailAlreadyExists",
            description: "Email already exists."
        );

        public static Error NotFocalPoint => Error.Unauthorized(
            code: "User.NotFocalPoint",
            description: "User is not a focal point."
        );

        public static Error Unauthorized => Error.Unauthorized(
            code: "User.Unauthorized",
            description: "User is not authorized."
        );
    }
}