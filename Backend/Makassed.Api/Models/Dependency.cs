using System.ComponentModel.DataAnnotations;
using Makassed.Api.Enums;

namespace Makassed.Api.Models;

public class Dependency
{
    [Key]
    public string Code { get; set; } = null!;

    public string? PdfUrl { get; set; }

    public int EstimatedTime { get; set; }

    public int PagesCount { get; set; }

    public string PolicyCode { get; set; } = null!;

    public Guid DependencyTypeId { get; set; }

    public DependencyType DependencyType { get; set; }

    // navigation properties
    public Policy Policy { get; set; } = null!;
}
