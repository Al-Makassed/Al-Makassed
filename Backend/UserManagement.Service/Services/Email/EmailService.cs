using MailKit.Net.Smtp;
using UserManagement.Service.Models.Domain;
using UserManagement.Service.Services.Message;

namespace UserManagement.Service.Services.Email;

public class EmailService : IEmailService
{
    private readonly EmailConfiguration _emailConfiguration;
    private readonly IMessageService _messageService;

    public EmailService(EmailConfiguration emailConfiguration, IMessageService messageService)
    {
        _emailConfiguration = emailConfiguration;
        _messageService = messageService;
    }

    public async void SendEmail(EmailMessage message)
    {
        var emailMessage = _messageService.CreateMessage(message);
        
        using var smtpClient = new SmtpClient();
        try
        {
            // Establish a secure connection to SMTP server and authenticate
            await smtpClient.ConnectAsync(_emailConfiguration.SmtpServer, _emailConfiguration.Port, true);
            smtpClient.AuthenticationMechanisms.Remove("XOAUTH2");
            await smtpClient.AuthenticateAsync(_emailConfiguration.UserName, _emailConfiguration.Password);

            // Send Email
            await smtpClient.SendAsync(emailMessage);
        }
        finally
        {
            await smtpClient.DisconnectAsync(true);
        }
        
    }
}