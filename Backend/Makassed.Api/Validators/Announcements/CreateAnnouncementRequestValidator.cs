using FluentValidation;
using Makassed.Contracts.Announcement;

namespace Makassed.Api.Validators.Announcements;

public class CreateAnnouncementRequestValidator : AbstractValidator<CreateAnnouncementRequest>
{
    public CreateAnnouncementRequestValidator()
    {
        RuleFor(x => x.Body).NotEmpty().WithMessage("Announcement body can't be null.");
    }
}
