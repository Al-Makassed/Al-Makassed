using FluentValidation;
using Makassed.Contracts.Policy;

namespace Makassed.Api.Validators.Policies;

public class UpdatePolicyRequestValidator : AbstractValidator<UpdatePolicyRequest>
{
    public UpdatePolicyRequestValidator()
    {
        RuleFor(p => p.Name)
            .NotEmpty().WithMessage("Policy name is required.");

        RuleFor(p => p.MainFile)
            .Must(f => f is not null && f.Length > 0).WithMessage("Main Policy File should be attached to it.")
            .Must(f => Path.GetExtension(f.FileName) == ".pdf").WithMessage("Unsupported file Extension.");
        
        RuleFor(p => p.EstimatedTimeInMin)
            .NotNull().WithMessage("Estimated time shouldn't be null.");
    }
}