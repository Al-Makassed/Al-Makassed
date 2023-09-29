using System.ComponentModel.DataAnnotations;

namespace Makassed.Api.Models
{
    public class Policy
    {
        [Key] public string Code { get; set; } = null!;
        public string Name { get; set; } = null!;
        public bool State { get; set; } = false;
        public string? PdfUrl { get; set; }
        public Guid ChapterId { get; set; }

        // navigation properties
        public Chapter Chapter { get; set; } = null!;

        public List<Dependency> Dependencies { get; set; } = new();
    }
}
