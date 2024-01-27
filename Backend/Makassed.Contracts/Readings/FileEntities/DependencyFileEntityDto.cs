namespace Makassed.Contracts.Readings.FileEntities;

public record DependencyFileEntityDto : GetAllFileEntitiesResponse
{
    public required Guid PolicyId { get; set; }

    public required string PolicyName { get; set; }
}
