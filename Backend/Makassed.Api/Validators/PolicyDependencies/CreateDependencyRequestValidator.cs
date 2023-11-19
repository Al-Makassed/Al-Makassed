using FluentValidation;
using Makassed.Contracts.PolicyDependency;

namespace Makassed.Api.Validators.PolicyDependencies;

public class CreateDependencyRequestValidator : AbstractValidator<CreatePolicyDependencyRequest>
{
    public CreateDependencyRequestValidator()
    {
        RuleFor(d => d.Code)
            .NotEmpty().WithMessage("Dependency code is required.");

        RuleFor(d => d.Name)
            .NotEmpty().WithMessage("Dependency name is required.");
        
        RuleFor(d => d.File)
            .NotNull().WithMessage("Dependency file should be attached to it.")
            .Must(f => Path.GetExtension(f.FileName) == ".pdf").WithMessage("Unsupported file Extension.");

        RuleFor(d => d.EstimatedTimeInMin)
            .NotNull().WithMessage("Estimated time shouldn't be null.");

        RuleFor(d => d.Type)
            .NotNull().WithMessage("Policy dependency type must be specified.");;
    }
}