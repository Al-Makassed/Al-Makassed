using MimeKit;

namespace UserManagement.Service.Models.Domain;

public class EmailMessage
{
    public EmailMessage(IEnumerable<string> to, string subject, string content)
    {
        To = new List<MailboxAddress>();
        To.AddRange(to.Select(receiver => new MailboxAddress(receiver[..receiver.IndexOf('@')], receiver)));
        Subject = subject;
        Content = content;
    }


    public List<MailboxAddress> To { get; set; }

    public string Subject { get; set; }

    public string Content { get; set; }

}