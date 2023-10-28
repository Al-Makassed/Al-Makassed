using Makassed.Api.Models.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace Makassed.Api.Data;

public class MakassedDbContext : DbContext
{
    public MakassedDbContext(DbContextOptions<MakassedDbContext> options) : base(options)
    {
    }

    public DbSet<Chapter> Chapters { get; set; } = null!;
    public DbSet<Policy> Policies { get; set; } = null!;
    public DbSet<Dependency> Dependencies { get; set; } = null!;

    public DbSet<MonitoringTool> MonitoringTools { get; set; } = null!;
    public DbSet<Field> Fields { get; set; } = null!;
    public DbSet<Department> Departments { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Department>()
            .HasMany(e => e.MonitoringTools)
            .WithMany(e => e.Departments);
    }
}
