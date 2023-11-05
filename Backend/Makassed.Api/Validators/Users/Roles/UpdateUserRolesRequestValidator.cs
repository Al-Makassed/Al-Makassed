using FluentValidation;
using Makassed.Contracts.User.Roles;

namespace Makassed.Api.Validators.Users.Roles;

public class UpdateUserRolesRequestValidator : AbstractValidator<UpdateUserRolesRequest>
{
    public UpdateUserRolesRequestValidator()
    {
        RuleFor(r => r.Roles)
            .NotEmpty().WithMessage("Roles are required.");
    }
}