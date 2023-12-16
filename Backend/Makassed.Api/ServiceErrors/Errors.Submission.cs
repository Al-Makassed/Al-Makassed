﻿using ErrorOr;

namespace Makassed.Api.ServiceErrors;

public abstract partial class Errors
{
    public abstract class Submission
    {
        public static Error NotAllFieldsAnswered => Error.Validation(
            code: "Submission.NotAllFieldsAnswered",
            description: "One or more fields are not answered."
        );
    }
}