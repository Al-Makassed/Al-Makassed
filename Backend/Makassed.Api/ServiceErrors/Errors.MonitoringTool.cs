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

        public static Error FieldNotFound => Error.NotFound(
            code: "MonitoringTool.FieldNotFound",
            description: "Field is not found."
        );

        public static Error DepartmentNotFound => Error.NotFound(
            code: "MonitoringTool.DepartmentNotFound",
            description: "Monitoring tool is not assigned to department."
        );

        public static Error LastFocalPointTask => Error.Validation(
            code: "MonitoringTool.LastFocalPointTask",
            description: "Monitoring tool has only one assigned department left, assign other departments before removing the last one."
        );

        public static Error LastField => Error.Validation(
            code: "MonitoringTool.LastField",
            description: "Monitoring tool has only one field left, add other fields before removing the last one."
        );

        public static Error DepartmentAlreadyAssigned => Error.Validation(
            code: "MonitoringTool.DepartmentAlreadyAssigned",
            description: "Monitoring tool is already assigned to department."
        );
    }
}