using FluentValidation;
using Makassed.Contracts.Authentication;

namespace Makassed.Api.Validators.Authentication;

public class ResetPasswordRequestValidator : AbstractValidator<ResetPasswordRequest>
{
    public ResetPasswordRequestValidator()
    {
        RuleFor(r => r.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("Not valid email address");
        
        RuleFor(r => r.Password)
            .NotEmpty().WithMessage("Password is required.")
            .MinimumLength(6).WithMessage("Password must be at least 6 characters.");
        
        RuleFor(r => r.ConfirmPassword)
            .NotEmpty().WithMessage("Confirm Password is required.")
            .Equal(r => r.Password).WithMessage("Password and Confirm Password must match.");
    }
}