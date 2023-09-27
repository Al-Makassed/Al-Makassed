namespace Makassed.Api.Models
{
    public class Chapter
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public bool State { get; set; }

        public ICollection<Policy> Policies { get; } = new List<Policy>();
    }
}
