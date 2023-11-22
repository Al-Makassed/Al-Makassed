using ErrorOr;

namespace Makassed.Api.ServiceErrors;

public abstract partial class Errors
{
    public abstract partial class MonitoringTool
    {
        public abstract class Field
        {
            // ReSharper disable once MemberHidesStaticFromOuterClass
            public static Error NotFound => Error.NotFound(
                code: "Field.NotFound",
                description: "Field is not found."
            );

            public static Error AlreadyExists => Error.Validation(
                code: "Field.AlreadyExists",
                description: "Field already exists."
            );
        }
    }
}