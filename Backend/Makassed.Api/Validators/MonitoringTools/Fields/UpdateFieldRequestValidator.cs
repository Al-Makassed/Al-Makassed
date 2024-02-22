using FluentValidation;
using Makassed.Contracts.MonitoringTool.Field;

namespace Makassed.Api.Validators.MonitoringTools.Fields;

public class UpdateFieldRequestValidator :AbstractValidator<UpdateFieldRequest>
{
    public UpdateFieldRequestValidator()
    {
        RuleFor(f => f.Content).NotEmpty().WithMessage("Field question is required.");

        RuleFor(f => f.CategoryId).NotEmpty().WithMessage("Category is required.");
    }
}
