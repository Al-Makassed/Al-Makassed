using ErrorOr;

namespace Makassed.Api.ServiceErrors
{
    public class Errors
    {
        public class Chapter 
        {
            public static Error NotFound => Error.NotFound(
            code: "Chapter.NotFound",
            description: "Chapter not found");
        }

    }
}
