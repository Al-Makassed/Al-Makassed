using ErrorOr;

namespace Makassed.Api.ServiceErrors;

public abstract partial class Errors
{
    public abstract class Chapter 
    {
        public static Error NotFound => Error.NotFound(
            code: "Chapter.NotFound",
            description: "Chapter is not found."
        );

        public static Error ChapterNameExists => Error.Validation(
            code: "ChapterName.Duplication",
            description: "Chapter name already exists."
        );
    }
}