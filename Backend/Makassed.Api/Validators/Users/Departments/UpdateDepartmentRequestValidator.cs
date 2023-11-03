using FluentValidation;
using Makassed.Contracts.User.Department;

namespace Makassed.Api.Validators.Users.Departments;

public class UpdateDepartmentRequestValidator : AbstractValidator<UpdateDepartmentRequest>
{
    public UpdateDepartmentRequestValidator()
    {
        RuleFor(x => x.Name).NotEmpty().WithMessage("Department name is required");
    }
}