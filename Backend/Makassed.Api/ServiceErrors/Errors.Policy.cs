using ErrorOr;

namespace Makassed.Api.ServiceErrors;

public abstract partial class Errors
{
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
            code: "PolicyName.Duplication",
            description: "Policy name already exists."
        );

        public static Error NotFoundChapterPolicies => Error.NotFound(
            code: "ChapterPolicies.NotFound",
            description: "There is no policies under this chapter."
        );

        public static Error DoesNotBelongToChapter => Error.Validation(
            code: "Policy.DoesNotBelongToChapter",
            description: "Policy does not belong to this chapter."
        );
    }
}