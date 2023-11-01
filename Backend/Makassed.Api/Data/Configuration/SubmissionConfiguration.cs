using Makassed.Api.Models.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Makassed.Api.Data.Configuration;

public class SubmissionConfiguration : IEntityTypeConfiguration<Submission>
{
    public void Configure(EntityTypeBuilder<Submission> builder)
    {
        //builder.HasMany(s => s.MonitoringToolFields)
        //    .WithMany(mf => mf.Submissions)
        //    .UsingEntity<MonitoringToolFieldsSubmissions>();

        builder.HasOne(s => s.MonitoringToolDepartment)
            .WithMany(mtd => mtd.Submissions)
            .HasForeignKey(s => new { s.MonitoringToolId, s.DepartmentId });

        builder.HasOne(s => s.Submitter)
            .WithMany(u => u.Submissions)
            .HasForeignKey(s => s.SubmitterId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
