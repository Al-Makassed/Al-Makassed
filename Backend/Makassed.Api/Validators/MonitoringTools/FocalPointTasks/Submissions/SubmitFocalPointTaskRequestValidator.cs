using FluentValidation;
using Makassed.Contracts.MonitoringTool.FocalPointTasks.Submissions;

namespace Makassed.Api.Validators.MonitoringTools.FocalPointTasks.Submissions;

public class SubmitFocalPointTaskRequestValidator : AbstractValidator<SubmitFocalPointTaskRequest>
{
    public SubmitFocalPointTaskRequestValidator()
    {
        RuleFor(x => x.Answers).NotEmpty().WithMessage("Answers are required");
    }
}