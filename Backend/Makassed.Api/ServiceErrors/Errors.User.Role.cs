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
        }
    }
}