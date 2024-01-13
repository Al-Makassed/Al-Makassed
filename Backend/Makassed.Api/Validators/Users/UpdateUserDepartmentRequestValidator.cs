using FluentValidation;
using Makassed.Contracts.User;

namespace Makassed.Api.Validators.Users;

public class UpdateUserDepartmentRequestValidator : AbstractValidator<UpdateUserDepartmentRequest>
{
    public UpdateUserDepartmentRequestValidator()
    {
        RuleFor(x => x.DepartmentId).NotEmpty();
    }
}
