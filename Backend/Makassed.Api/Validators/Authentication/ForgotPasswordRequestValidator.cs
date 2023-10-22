using FluentValidation;
using Makassed.Contracts.Authentication;

namespace Makassed.Api.Validators.Authentication;

public class ForgotPasswordRequestValidator : AbstractValidator<ForgotPasswordRequest>
{
    public ForgotPasswordRequestValidator()
    {
        RuleFor(f => f.UserId)
            .NotEmpty().WithMessage("User ID is required.");
    }
    
}