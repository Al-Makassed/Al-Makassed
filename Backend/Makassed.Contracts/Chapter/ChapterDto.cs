using Makassed.Contracts.Policy;

namespace Makassed.Contracts.Chapter
{
    public record CreateChapterResponse
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public bool State { get; set; }
        public IEnumerable<PolicyDto> Policies { get; } = new List<PolicyDto>();
    }
}
