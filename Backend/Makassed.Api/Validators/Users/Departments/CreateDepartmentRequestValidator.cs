using FluentValidation;
using Makassed.Contracts.User.Department;

namespace Makassed.Api.Validators.Users.Departments;

public class CreateDepartmentRequestValidator : AbstractValidator<CreateDepartmentRequest>
{
    public CreateDepartmentRequestValidator()
    {
        RuleFor(x => x.Name).NotEmpty().WithMessage("Department name is required");

        RuleFor(x => x.HeadId).NotEmpty().WithMessage("Department head ID is required");
    }
}
