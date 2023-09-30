using FluentValidation;
using Makassed.Api.Services.Chapters;
using Makassed.Contracts.Chapter;

namespace Makassed.Api.Validators;

public class CreateChapterRequestValidator : AbstractValidator<CreateChapterRequest>
{
    private readonly IChapterService _chapterService;

    public CreateChapterRequestValidator(IChapterService chapterService) 
    {
        _chapterService = chapterService;

        RuleFor(c => c.Name)
            .NotEmpty().WithMessage("Chapter name is required.")
            .MinimumLength(3).WithMessage("Chapter name is too short")
            .MaximumLength(30).WithMessage("Chapter name is too long");
    }
}