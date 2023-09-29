namespace Makassed.Contracts.Dependency
{
    public record DependencyDto
    {
        public string Code { get; set; } = null!;
        public string? PdfUrl { get; set; }
        public int EstimatedTime { get; set; }
        public int PagesCount { get; set; }
        public string PolicyCode { get; set; } = null!;
        public Guid DependencyTypeId { get; set; }
    }
}
