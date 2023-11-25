using ErrorOr;

namespace Makassed.Api.ServiceErrors;

public abstract partial class Errors
{
    public abstract class Entity
    {
        public static Error NotFound => Error.NotFound(
            code: "Entity.NotFound",
            description: "Entity is not found."
        );
    }
}