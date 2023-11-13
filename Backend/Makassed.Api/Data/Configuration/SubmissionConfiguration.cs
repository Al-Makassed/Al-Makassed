using Makassed.Api.Models.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Makassed.Api.Data.Configuration;

public class SubmissionConfiguration : IEntityTypeConfiguration<Submission>
{
    public void Configure(EntityTypeBuilder<Submission> builder)
    {
        builder.HasOne(s => s.FocalPointTask)
               .WithMany(fpt => fpt.Submissions)
               .HasForeignKey(s => s.FocalPointTaskId);
               //.OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(s => s.Submitter)
               .WithMany(u => u.Submissions)
               .HasForeignKey(s => s.SubmitterId)
               .OnDelete(DeleteBehavior.Restrict);
    }
}