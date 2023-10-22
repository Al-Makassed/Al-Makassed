using ErrorOr;

namespace Makassed.Api.ServiceErrors;

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
            code: "PolicyName.Duplication",
            description: "Policy name already exists."
        );

        public static Error NotFoundChapterPolicies => Error.NotFound(
            code: "ChapterPolicies.NotFound",
            description: "There is no policies under this chapter."
        );
    }
        
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
    }

    public abstract class User
    {
        public static Error NotFound => Error.NotFound(
            code: "User.NotFound",
            description: "User is not found."            
        );

        public static Error WrongPassword => Error.Unauthorized(
            code: "User.WrongPassword",
            description: "Wrong password."
        );

        public static Error ResetPasswordFailed => Error.Unauthorized(
            code: "User.ResetPasswordFailed", 
            description: "Reset password failed."
        );

        public static Error AlreadyExists => Error.Conflict(
            code: "User.AlreadyExists",
            description: "User already exists."
        );

        public static Error CreateFailed => Error.Conflict(
            code: "User.CreateFailed",
            description: "User creation failed."
        );

        public static Error AddToRoleFailed => Error.Conflict(
            code: "User.AddToRoleFailed",
            description: "Adding role to user failed."
        );

        public static Error EmailAlreadyExists => Error.Conflict(
            code: "User.EmailAlreadyExists",
            description: "Email already exists."
        );
    }

    public abstract class Role
    {
        public static Error NotFound => Error.NotFound(
            code: "Role.NotFound",
            description: "Role is not found."
        );
    }
}