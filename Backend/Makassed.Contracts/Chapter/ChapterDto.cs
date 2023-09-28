using Makassed.Contracts.Policy;

namespace Makassed.Contracts.Chapter
{
    public record ChapterDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public bool State { get; set; }

        public ICollection<PolicyDto> PolicyDtos { get; } = new List<PolicyDto>();
    }
}
