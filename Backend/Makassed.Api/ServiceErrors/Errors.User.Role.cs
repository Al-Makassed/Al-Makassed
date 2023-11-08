using ErrorOr;
using Makassed.Contracts.General;

namespace Makassed.Api.ServiceErrors;

public abstract partial class Errors
{
    public abstract partial class User
    {
        public static ErrorOr<SuccessResponse> NoValidRolesEntered { get; internal set; }

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

            public static Error NoValidRoles => Error.Validation(
                code: "Role.NoValidRoles",
                description: "No valid roles were entered."
            );
        }
    }
}