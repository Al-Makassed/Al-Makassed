using Makassed.Api.Models.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Makassed.Api.Data.Configuration;

public class MonitoringToolFieldsSubmissionsConfiguration : IEntityTypeConfiguration<MonitoringToolFieldsSubmissions>
{
    public void Configure(EntityTypeBuilder<MonitoringToolFieldsSubmissions> builder)
    {
        builder
        .HasKey(mtfs => new { mtfs.MonitoringToolId, mtfs.FieldId, mtfs.SubmissionId });

        builder
            .HasOne(ms => ms.Submission)
            .WithMany(s => s.MonitoringToolFieldsSubmissions)
            .HasForeignKey(ms => ms.SubmissionId)
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(ms => ms.MonitoringToolField)
            .WithMany(mf => mf.MonitoringToolFieldsSubmissions)
            .HasForeignKey(ms => new { ms.MonitoringToolId, ms.FieldId})
            .OnDelete(DeleteBehavior.Restrict);
    }
}