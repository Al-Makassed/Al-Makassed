namespace Makassed.Api.Models
{
    public class Dependency
    {
        public string Code { get; set; } = null!;
        public string? PdfUrl { get; set; }
        public int EstimatedTime { get; set; }
        public int PagesCount { get; set; }
        public string PolicyId { get; set; } = null!;
        public Guid DependencyTypeId { get; set; }

        // navigation properties
        public Policy Policy { get; set; } = null!;
        public DependencyType DependencyType { get; set; } = null!;

    }
}
