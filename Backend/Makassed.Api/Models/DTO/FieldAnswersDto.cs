using Makassed.Api.Models.Domain;

namespace Makassed.Api.Models.DTO;

public record FieldAnswersDto
{
    public List<FieldAnswer> Answers { get; set; } = new();
}
