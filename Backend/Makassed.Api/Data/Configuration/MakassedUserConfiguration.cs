using Makassed.Api.Models.Domain;
using Makassed.Contracts.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Makassed.Api.Data.Configuration;

public class MakassedUserConfiguration : IEntityTypeConfiguration<MakassedUser>
{
    public void Configure(EntityTypeBuilder<MakassedUser> builder)
    {
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
