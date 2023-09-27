namespace Makassed.Api.Models
{
    public class Policy
    {
        public string Code { get; set; } = null!;
        public string Name { get; set; } = null!;
        public bool state { get; set; } = false;
        public string? PdfUrl { get; set; }
        public Guid ChapterId { get; set; }

        // navigation properties
        public Chapter Chapter { get; set; } = null!;
        ICollection<Dependency> Dependencies { get; } = new List<Dependency>();

    }
}
