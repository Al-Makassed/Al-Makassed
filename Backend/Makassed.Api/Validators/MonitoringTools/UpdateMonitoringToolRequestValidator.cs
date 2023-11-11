using FluentValidation;
using Makassed.Contracts.MonitoringTool;

namespace Makassed.Api.Validators.MonitoringTools;

public class UpdateMonitoringToolRequestValidator : AbstractValidator<UpdateMonitoringToolRequest>
{
    public UpdateMonitoringToolRequestValidator()
    {
        RuleFor(m => m.Name)
            .NotEmpty()
            .WithMessage("Name is required.");

        RuleFor(m => m.Description)
            .NotEmpty()
            .WithMessage("Description is required.");

        RuleFor(m => m.FieldsIdes)
            .NotEmpty()
            .WithMessage("At least one field is required.");

        RuleFor(m => m.DepartmentsIdes)
            .NotEmpty()
            .WithMessage("At least one department is required.");
    }
}