using UserManagement.Service.Models.Domain;

namespace UserManagement.Service.Services.Email;

public interface IEmailService
{
    void SendEmail(EmailMessage message);
}