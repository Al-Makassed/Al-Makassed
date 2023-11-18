using FluentValidation;
using Makassed.Api.Constants;
using Makassed.Contracts.User;

namespace Makassed.Api.Validators.Chapters;

public class UploadUserAvatarValidator : AbstractValidator<UploadUserAvatarRequest>
{
    public UploadUserAvatarValidator()
    {
        RuleFor(request => request.Image)
            .Must(BeAValidImage)
            .WithMessage("Unsupported file extension")
            .WithErrorCode("file");

        RuleFor(request => request.Image.Length)
            .Must(BeAValidFileSize)
            .WithMessage($"File size exceeds {AvatarUploadConfigs.MaxImageUploadSizeInMegabytes} MB")
            .WithErrorCode("file");
    }

    private bool BeAValidImage(IFormFile file)
    {
        var extension = Path.GetExtension(file.FileName);
        return AvatarUploadConfigs.AllowedExtensions.Contains(extension);
    }

    private bool BeAValidFileSize(long length)
    {
        return length <= AvatarUploadConfigs.MaxImageUploadSize;
    }
}