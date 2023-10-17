using FluentValidation;
using Makassed.Contracts.Policy;

namespace Makassed.Api.Validators.Policies;

public class CreatePolicyValidator : AbstractValidator<CreatePolicyRequest>
{
    public CreatePolicyValidator()
    {
        RuleFor(p => p.Name)
            .NotEmpty()
            .WithMessage("Policy name is required.");
    }
}