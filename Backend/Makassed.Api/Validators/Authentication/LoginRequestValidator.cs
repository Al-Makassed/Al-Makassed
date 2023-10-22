using FluentValidation;
using Makassed.Contracts.Authentication;

namespace Makassed.Api.Validators.Authentication;

public class LoginRequestValidator : AbstractValidator<LoginRequest>
{
    public LoginRequestValidator()
    {
        RuleFor(l => l.UserId).NotEmpty().WithMessage("User ID is required.");
        
        RuleFor(l => l.Password).NotEmpty().WithMessage("User Password is required.");
    }
}