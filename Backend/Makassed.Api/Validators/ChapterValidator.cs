using FluentValidation;
using Makassed.Api.Models;

namespace Makassed.Api.Validators
{
    public class ChapterValidator : AbstractValidator<Chapter>
    {
        public ChapterValidator() 
        {
            RuleFor(c => c.Name); //uniqness check will be placed here
        }
    }
}
