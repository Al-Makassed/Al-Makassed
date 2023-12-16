using FluentValidation;
using Makassed.Contracts.User;

namespace Makassed.Api.Validators.Users;

public class UpdateUserRequestValidator : AbstractValidator<UpdateUserRequest>
{
    public UpdateUserRequestValidator()
    {
        RuleFor(x => x.FullName)
            .NotEmpty()
            .WithMessage("Full name is required.")
            .MaximumLength(100)
            .WithMessage("Full name cannot be longer than 100 characters.");

        RuleFor(x => x.Email)
            .EmailAddress()
            .WithMessage("Email is not valid.");

        RuleFor(x => x.PhoneNumber)
            .Matches(@"^\+?[0-9]{10,}$")
            .WithMessage("Phone number is not valid.");
    }
}
