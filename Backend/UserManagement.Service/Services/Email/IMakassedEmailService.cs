using UserManagement.Service.Models.Domain;

namespace UserManagement.Service.Services.Email;

public interface IMakassedEmailService
{
    Task SendEmail(EmailMessage message);

    Task SendForgetPasswordEmail(string email, string url);
}