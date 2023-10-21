using MailKit.Net.Smtp;
using MimeKit;
using UserManagement.Service.Models.Domain;

namespace UserManagement.Service.Services.Email;

public class SmtpEmailService : IEmailService
{
    private readonly EmailConfiguration _emailConfiguration;

    public SmtpEmailService(EmailConfiguration emailConfiguration)
    {
        _emailConfiguration = emailConfiguration;
    }

    public async void SendEmail(EmailMessage message)
    {
        var emailMessage = CreateMimeMessage(message);
        await Send(emailMessage);
    }
    
    private MimeMessage CreateMimeMessage(EmailMessage message)
    {
        var emailMessage = new MimeMessage();
        emailMessage.From.Add(new MailboxAddress("Maqasid", _emailConfiguration.From));
        emailMessage.To.AddRange(message.To);
        emailMessage.Subject = message.Subject;
        emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = message.Content };

        return emailMessage;
    }

    private async Task Send(MimeMessage message)
    {
        using var smtpClient = new SmtpClient();
        try
        {
            // Establish a secure connection to SMTP server and authenticate
            await smtpClient.ConnectAsync(_emailConfiguration.SmtpServer, _emailConfiguration.Port, true);
            smtpClient.AuthenticationMechanisms.Remove("XOAUTH2");
            await smtpClient.AuthenticateAsync(_emailConfiguration.UserName, _emailConfiguration.Password);

            // Send Email
            await smtpClient.SendAsync(message);
        }
        finally
        {
            await smtpClient.DisconnectAsync(true);
        }
    }
}