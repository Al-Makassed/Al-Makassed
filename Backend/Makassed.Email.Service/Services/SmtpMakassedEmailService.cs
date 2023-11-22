using MailKit.Net.Smtp;
using MimeKit;
using Makassed.Email.Service.Models.Domain;

namespace Makassed.Email.Service.Services;

public class SmtpMakassedEmailService : IMakassedEmailService
{
    private readonly EmailConfiguration _emailConfiguration;

    public SmtpMakassedEmailService(EmailConfiguration emailConfiguration)
    {
        _emailConfiguration = emailConfiguration;
    }

    private MimeMessage CreateMimeMessage(EmailMessage message)
    {
        var emailMessage = new MimeMessage();
        emailMessage.From.Add(new MailboxAddress("Makassed", _emailConfiguration.From));
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

    public async Task SendEmail(EmailMessage message)
    {
        var emailMessage = CreateMimeMessage(message);
        await Send(emailMessage);
    }

    public async Task SendForgetPasswordEmail(string email, string url)
    {
        EmailMessage message = new(new[] { email }, "Reset Password", url);
        await SendEmail(message);
    }
}