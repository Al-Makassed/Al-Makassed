using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Makassed.Api.Models.Domain
{
    public class Policy
    {
        [Key] public string Code { get; set; } = null!;
        
        public string Name { get; set; } = null!;

        [NotMapped] public IFormFile MainFile { get; set; } = null!;

        public string? PdfUrl { get; set; }
        
        public Guid ChapterId { get; set; }

        // Navigation Properties
        public Chapter Chapter { get; set; } = null!;

        public List<Dependency> Dependencies { get; set; } = new();
    }
}
