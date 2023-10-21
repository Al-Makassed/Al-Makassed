using MimeKit;
using UserManagement.Service.Models.Domain;

namespace UserManagement.Service.Services.Message;

public class MimeMessageService : IMessageService
{
    private readonly EmailConfiguration _emailConfiguration;

    public MimeMessageService(EmailConfiguration emailConfiguration)
    {
        _emailConfiguration = emailConfiguration;
    }

    public MimeMessage CreateMessage(EmailMessage message)
    {
        var emailMessage = new MimeMessage();
        emailMessage.From.Add(new MailboxAddress("Maqasid", _emailConfiguration.From));
        emailMessage.To.AddRange(message.To);
        emailMessage.Subject = message.Subject;
        emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = message.Content };

        return emailMessage;
    }
}