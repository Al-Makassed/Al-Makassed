using Makassed.Api.Models.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Makassed.Api.Data.Configuration;

public class MonitoringToolConfiguration : IEntityTypeConfiguration<MonitoringTool>
{
    public void Configure(EntityTypeBuilder<MonitoringTool> builder)
    {
        //builder.HasMany(m => m.Fields)
        //       .WithMany(f => f.MonitoringTools)
        //       .UsingEntity<MonitoringToolFields>();

        builder.HasMany(m => m.FocalPointTasks)
               .WithOne(ft => ft.MonitoringTool);
    }
}