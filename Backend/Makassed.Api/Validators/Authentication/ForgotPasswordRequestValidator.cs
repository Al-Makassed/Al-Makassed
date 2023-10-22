using FluentValidation;
using Makassed.Contracts.Authentication;

namespace Makassed.Api.Validators.Authentication;

public class ForgotPasswordRequestValidator : AbstractValidator<ForgotPasswordRequest>
{
    public ForgotPasswordRequestValidator()
    {
        RuleFor(f => f.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("Not valid email address");
    }
    
}