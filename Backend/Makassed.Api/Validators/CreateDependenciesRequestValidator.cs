using FluentValidation;
using Makassed.Contracts.PolicyDependency;

namespace Makassed.Api.Validators;

public class CreateDependenciesRequestValidator : AbstractValidator<CreatePolicyDependencyRequest>
{
    public CreateDependenciesRequestValidator()
    {
        RuleFor(d => d.Name)
            .NotEmpty().WithMessage("Dependency name is required.");
        
        RuleFor(d => d.File)
            .NotNull().WithMessage("Dependency file should be attached to it.")
            .Must(f => Path.GetExtension(f.FileName) == ".pdf").WithMessage("Unsupported file Extension.");

        RuleFor(d => d.EstimatedTime)
            .NotNull().WithMessage("Estimated time shouldn't be null.");
    }
}