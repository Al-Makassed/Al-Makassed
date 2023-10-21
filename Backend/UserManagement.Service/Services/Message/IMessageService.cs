using MimeKit;
using UserManagement.Service.Models.Domain;

namespace UserManagement.Service.Services.Message;

public interface IMessageService
{
    MimeMessage CreateMessage(EmailMessage message);
}