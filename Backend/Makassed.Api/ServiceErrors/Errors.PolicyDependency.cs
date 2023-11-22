using ErrorOr;
using Makassed.Api.Models.Domain;

namespace Makassed.Api.ServiceErrors;

public abstract partial class Errors
{
    public abstract class PolicyDependency
    {
        public static Error NotFound => Error.NotFound(
            code: "PolicyDependency.NotFound",
            description: "Policy dependency is not found."
        );

        public static Error NotFoundPolicyDependenciesType => Error.NotFound(
            code: "PolicyDependenciesType.NotFound",
            description: "There's no policy dependencies of the given type connected to the given policy."
        );

        public static Error CantAdd => Error.Validation(
            code: "PolicyDependency.CantAdd",
            description: "Can't add policy dependency to non-approved policy."
        );
    }
}