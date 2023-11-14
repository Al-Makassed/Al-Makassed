using Makassed.Api.Models.Domain;

namespace Makassed.Api.Models.DTO;

public class FieldAnswersDto
{
    public List<FieldAnswer> Answers { get; set; } = new();
}
