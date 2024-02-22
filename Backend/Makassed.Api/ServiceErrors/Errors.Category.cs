using ErrorOr;

namespace Makassed.Api.ServiceErrors;

public abstract partial class Errors
{
    public abstract class Category
    {
        public static Error NotFound => Error.NotFound(
            code: "Category.NotFound",
            description: "Category is not found."
        );
    }

}