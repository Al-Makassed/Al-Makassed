using Makassed.Api.Models.Domain;
using Makassed.Contracts.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Makassed.Api.Data.Configuration;

public class PolicyConfiguration : IEntityTypeConfiguration<Policy>
{
    public void Configure(EntityTypeBuilder<Policy> builder)
    {
        builder
            .HasOne(p => p.Creator)
            .WithMany()
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(p => p.Users)
            .WithMany(u => u.Policies)
            .UsingEntity<PolicyUser>(
            j => j
                .HasOne(pu => pu.User)
                .WithMany()
                .HasForeignKey(pu => pu.UserId),
            j => j
                .HasOne(pu => pu.Policy)
                .WithMany()
                .HasForeignKey(pu => pu.PolicyId),
            j =>
            {
                j.HasKey(pu => new { pu.PolicyId, pu.UserId });
                j.Property(pu => pu.ReadingState).HasDefaultValue(FileReadingState.NotStarted);
            });
    }
}
