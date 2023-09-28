using FluentValidation;
using Makassed.Api.Models;
using Makassed.Api.Services.Chapter;

namespace Makassed.Api.Validators
{
    public class ChapterValidator : AbstractValidator<Chapter>
    {
        private readonly IChapterService _chapterService;

        public ChapterValidator(IChapterService chapterService) 
        {
            _chapterService = chapterService;

            RuleFor(c => c.Name)
                .NotEmpty().WithMessage("Chapter name is required.")
                .MustAsync(async(name, cancellation) =>
                {
                    return await _chapterService.IsUniqueName(name);
                }).WithMessage("Chapter name already exists.");
        }
    }
}
