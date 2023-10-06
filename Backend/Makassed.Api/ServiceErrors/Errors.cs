using ErrorOr;

namespace Makassed.Api.ServiceErrors
{
    public abstract class Errors
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

        public abstract class Policy
        {
            public static Error NotFound => Error.NotFound(
                code: "Policy.NotFound",
                description: "Policy is not found."
            );

            public static Error Conflict => Error.Conflict(
                code: "Conflict.Creating.Policy",
                description: "Policy or one of its dependencies is inconsistent."
            );
            
            public static Error NameDuplication => Error.Validation(
                code: "Policy.Name.Duplicated",
                description: "Policy name already exists."
            );
        }

    }
}
