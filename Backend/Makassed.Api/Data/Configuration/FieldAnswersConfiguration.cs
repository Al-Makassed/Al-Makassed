using Makassed.Api.Models.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Makassed.Api.Data.Configuration;

public class FieldAnswersConfiguration : IEntityTypeConfiguration<FieldAnswer>
{
    public void Configure(EntityTypeBuilder<FieldAnswer> builder)
    {
        builder
        .HasKey(a => new { a.FieldId, a.SubmissionId });

        builder
            .HasOne(a => a.Submission)
            .WithMany(s => s.Answers)
            .HasForeignKey(a => a.SubmissionId);
            //.OnDelete(DeleteBehavior.Restrict);

        builder
            .HasOne(a => a.Field)
            .WithMany(f => f.Answers)
            .HasForeignKey(a => a.FieldId);
            //.OnDelete(DeleteBehavior.Restrict);
    }
}