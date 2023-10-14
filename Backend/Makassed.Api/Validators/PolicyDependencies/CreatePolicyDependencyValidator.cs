using FluentValidation;
using Makassed.Contracts.Dependency;

namespace Makassed.Api.Validators.PolicyDependencies;

public class CreatePolicyDependencyValidator : AbstractValidator<DependencyDto>
{
    public CreatePolicyDependencyValidator()
    {
        RuleFor(d => d.PdfUrl)
            .NotNull().NotEmpty().WithMessage("Dependency file should be attached to it.");

        RuleFor(d => d.EstimatedTime)
            .NotNull().WithMessage("Estimated time shouldn't be null.");

        RuleFor(d => d.PagesCount)
            .NotNull().WithMessage("Pages count shouldn't be null.");
    }
}