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

        public static Error NameAlreadyExist => Error.Validation(
            code: "MonitoringTool.NameAlreadyExist",
            description: "Monitoring Tool name already exist."
        );

        public static Error NoValidAssignedDepartments => Error.Validation(
            code: "MonitoringTool.NoValidAssignedDepartments",
            description: "No valid assigned departments."
        );

        public static Error NoValidFields => Error.Validation(
            code: "MonitoringTool.NoValidFields",
            description: "No valid fields."
        );
    }
}