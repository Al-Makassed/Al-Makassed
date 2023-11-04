using FluentValidation;
using Makassed.Contracts.Authentication;

namespace Makassed.Api.Validators.Authentication;

public class RestPasswordRequestValidator : AbstractValidator<ResetPasswordRequest>
{
    public RestPasswordRequestValidator()
    { 
        RuleFor(r => r.UserId)
            .NotEmpty().WithMessage("User Id is required.");
        
        RuleFor(r => r.CurrentPassword)
            .NotEmpty().WithMessage("Password is required.")
            .MinimumLength(6).WithMessage("Password must be at least 6 characters.");
        
        RuleFor(r => r.NewPassword)
            .NotEmpty().WithMessage("Password is required.")
            .MinimumLength(6).WithMessage("Password must be at least 6 characters.");
    }
}