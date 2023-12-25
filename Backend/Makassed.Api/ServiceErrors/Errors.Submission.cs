using ErrorOr;

namespace Makassed.Api.ServiceErrors;

public abstract partial class Errors
{
    public abstract class Submission
    {
        public static Error NotAllFieldsAnswered => Error.Validation(
            code: "Submission.NotAllFieldsAnswered",
            description: "One or more fields are not answered."
        );

        public static Error NotFound => Error.NotFound(
            code: "Submission.NotFound",
            description: "There is no submission with the given id."
        );
    }
}