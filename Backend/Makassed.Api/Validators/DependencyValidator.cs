using FluentValidation;
using Makassed.Api.Models;

namespace Makassed.Api.Validators
{
    public class DependencyValidator : AbstractValidator<Dependency>
    {
        public DependencyValidator()
        {
            RuleFor(d => d.PdfUrl)
                .NotNull().NotEmpty().WithMessage("Dependency file should be attached to it.");

            RuleFor(d => d.EstimatedTime)
                .NotNull().WithMessage("Estimated time shouldn't be null.");

            RuleFor(d => d.PagesCount)
                .NotNull().WithMessage("Pages count shouldn't be null.");
        }
    }
}
