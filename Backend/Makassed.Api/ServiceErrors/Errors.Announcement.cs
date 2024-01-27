using ErrorOr;

namespace Makassed.Api.ServiceErrors;

public abstract partial class Errors
{
    public abstract class Announcement {
        public static Error NotFound => Error.NotFound(
            code: "Announcement.NotFound",
            description: "Announcement is not found."
        );
    }
}