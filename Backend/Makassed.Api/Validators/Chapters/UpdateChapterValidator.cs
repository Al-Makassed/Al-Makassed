using FluentValidation;
using Makassed.Contracts.Chapter;

namespace Makassed.Api.Validators.Chapters;

public class UpdateChapterValidator : AbstractValidator<UpdateChapterRequest>
{
    public UpdateChapterValidator()
    {
        RuleFor(c => c.Name)
            .NotEmpty().WithMessage("Chapter name is required.")
            .MinimumLength(7).WithMessage("Chapter name is too short")
            .MaximumLength(50).WithMessage("Chapter name is too long");
    }
}