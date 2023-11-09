using ErrorOr;

namespace Makassed.Api.ServiceErrors;

public abstract partial class Errors
{
    public abstract partial class MonitoringTool
    {
        public static Error NotFound => Error.NotFound(
            code: "MonitoringTool.NotFound",
            description: "Monitoring Tool is not found."
        );
    }
}