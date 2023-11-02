using Makassed.Api.Models.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Makassed.Api.Data.Configuration;

public class DepartmentConfiguration : IEntityTypeConfiguration<Department>
{
    public void Configure(EntityTypeBuilder<Department> builder)
    {
        builder
               .HasOne(d => d.Head)
               .WithOne()
               .HasForeignKey<Department>(d => d.HeadId)
               .OnDelete(DeleteBehavior.Restrict);
    }
}