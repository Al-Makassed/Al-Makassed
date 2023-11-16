using FluentValidation;
using Makassed.Contracts.Policy;

namespace Makassed.Api.Validators.Policies;

public class CreatePolicyRequestValidator : AbstractValidator<CreatePolicyRequest>
{
    public CreatePolicyRequestValidator()
    {
        RuleFor(p => p.Code)
            .NotEmpty().WithMessage("Policy code is required.");

        RuleFor(p => p.Name)
            .NotEmpty().WithMessage("Policy name is required.");

        RuleFor(p => p.MainFile)
            .Must(f => f is not null && f.Length > 0).WithMessage("Main Policy File should be attached to it.")
            .Must(f => Path.GetExtension(f.FileName) == ".pdf").WithMessage("Unsupported file Extension.");
        
        RuleFor(p => p.EstimatedTimeInMin)
            .NotNull().WithMessage("Estimated time shouldn't be null.")
            .Must(et => et > 0 && et <= 60);

        RuleFor(p => p.ChapterId)
            .NotEmpty().WithMessage("Chapter ID is required.");
    }
}