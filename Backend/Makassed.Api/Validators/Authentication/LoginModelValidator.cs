using FluentValidation;
using UserManagement.Service.Models.DTOs;

namespace Makassed.Api.Validators.Authentication;

public class LoginModelValidator : AbstractValidator<LoginRequest>
{
    public LoginModelValidator()
    {
        RuleFor(l => l.UserId).NotEmpty().WithMessage("User ID is required.");
        
        RuleFor(l => l.Password).NotEmpty().WithMessage("User Password is required.");
    }
}