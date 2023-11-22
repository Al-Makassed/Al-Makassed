using Makassed.Email.Service.Models.Domain;

namespace Makassed.Email.Service.Services;

public interface IMakassedEmailService
{
    Task SendEmail(EmailMessage message);

    Task SendForgetPasswordEmail(string email, string url);
}