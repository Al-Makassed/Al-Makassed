using ErrorOr;

namespace Makassed.Api.ServiceErrors;

public abstract partial class Errors
{
    public abstract partial class User
    {
        public static Error NotFound => Error.NotFound(
            code: "User.NotFound",
            description: "User is not found."            
        );

        public static Error WrongCredentials => Error.Unauthorized(
            code: "User.WrongCredentials",
            description: "One or more login credentials are invalid."
        );

        public static Error ResetPasswordFailed => Error.Unauthorized(
            code: "User.ResetPasswordFailed", 
            description: "Reset password failed."
        );

        public static Error AlreadyExists => Error.Conflict(
            code: "User.AlreadyExists",
            description: "User already exists."
        );

        public static Error CreateFailed => Error.Conflict(
            code: "User.CreateFailed",
            description: "User creation failed."
        );

        public static Error AddToRoleFailed => Error.Conflict(
            code: "User.AddToRoleFailed",
            description: "Adding role to user failed."
        );

        public static Error EmailAlreadyExists => Error.Conflict(
            code: "User.EmailAlreadyExists",
            description: "Email already exists."
        );
    }
}