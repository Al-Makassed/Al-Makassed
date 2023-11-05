using Makassed.Api.Models.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Makassed.Api.Data.Configuration;

public class MakassedUserConfiguration : IEntityTypeConfiguration<MakassedUser>
{
    public void Configure(EntityTypeBuilder<MakassedUser> builder)
    {
        builder.HasMany(u => u.Policies)
               .WithMany(p => p.Users)
               .UsingEntity<PolicyUser>();

        builder.HasMany(u => u.PolicyDependencies)
               .WithMany(d => d.Users)
               .UsingEntity<DependencyUser>();

        builder.HasOne(u => u.Department)
               .WithMany(d => d.Users)
               .HasForeignKey(u => u.DepartmentId);

        builder.Property(u => u.FullName)
               .HasMaxLength(150)
               .IsRequired();

        builder.Property(u => u.UserName)
               .HasMaxLength(50)
               .IsRequired();

        builder.Property(u => u.CreatedOn)
               .HasDefaultValueSql("GETDATE()")
               .ValueGeneratedOnAdd();
    }
}
