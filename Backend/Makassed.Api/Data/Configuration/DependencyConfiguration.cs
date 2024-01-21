using Makassed.Api.Models.Domain;
using Makassed.Contracts.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Makassed.Api.Data.Configuration;

public class DependencyConfiguration : IEntityTypeConfiguration<Dependency>
{
    public void Configure(EntityTypeBuilder<Dependency> builder)
    {
        builder
            .HasOne(d => d.Creator)
            .WithMany()
            .OnDelete(DeleteBehavior.Restrict);

        builder
            .HasMany(d => d.Users)
            .WithMany(u => u.PolicyDependencies)
            .UsingEntity<DependencyUser>(
            j => j
                .HasOne(du => du.User)
                .WithMany()
                .HasForeignKey(du => du.UserId),
            j => j
                .HasOne(du => du.Dependency)
                .WithMany()
                .HasForeignKey(du => du.DependencyId),
            j =>
            {
                j.HasKey(du => new { du.DependencyId, du.UserId });
                j.Property(du => du.ReadingState).HasDefaultValue(FileReadingState.NotStarted);
            });
    }
}
