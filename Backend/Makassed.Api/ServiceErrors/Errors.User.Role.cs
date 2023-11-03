using ErrorOr;

namespace Makassed.Api.ServiceErrors;

public abstract partial class Errors
{
    public abstract partial class User
    {
        public abstract class Role
        {
            public static Error NotFound => Error.NotFound(
                code: "Role.NotFound",
                description: "Role is not found."
            );

            public static Error AddToRolesFailed => Error.Conflict(
                code: "User.AddToRoleFailed",
                description: "Adding role to user failed."
            );

            public static Error SomethingWentWrong => Error.Conflict(
                code: "Role.SomethingWentWrong",
                description: "Something went wrong while processing your request."
            );
        }
    }
}