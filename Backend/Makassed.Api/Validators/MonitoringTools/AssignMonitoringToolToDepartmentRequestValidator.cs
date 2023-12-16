using FluentValidation;
using Makassed.Contracts.MonitoringTool;

namespace Makassed.Api.Validators.MonitoringTools;

public class AssignMonitoringToolToDepartmentRequestValidator : AbstractValidator<AssignMonitoringToolToDepartmentRequest>
{
    public AssignMonitoringToolToDepartmentRequestValidator()
    {
        RuleFor(x => x.DepartmentsIdes)
            .NotEmpty()
            .WithMessage("Departments are required.");
    }
}
