using FluentValidation;
using Makassed.Contracts.Chapter;

namespace Makassed.Api.Validators.Chapters;

public class CreateChapterValidator : AbstractValidator<CreateChapterRequest>
{
    public CreateChapterValidator()
    {
        RuleFor(c => c.Name)
            .NotEmpty()
            .WithMessage("Chapter name is required.")
            .MinimumLength(3)
            .MaximumLength(30);
    }
}

