using Makassed.Api.Data.Configuration;
using Makassed.Api.Models.Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Makassed.Api.Data;

public class MakassedDbContext : IdentityDbContext<MakassedUser>
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
    public DbSet<Submission> Submissions { get; set; } = null!;
    public DbSet<FieldAnswer> FieldAnswers { get; set; } = null!;
    public DbSet<FocalPointTask> FocalPointTasks { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.CustomizeIdentityTablesNames();

        builder.Entity<Policy>()
               .HasOne(p => p.Creator)
               .WithOne()
               .HasForeignKey<Policy>(p=> p.CreatorId)
               .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<Dependency>()
               .HasOne(d => d.Creator)
               .WithOne()
               .HasForeignKey<Dependency>(d => d.CreatorId)
               .OnDelete(DeleteBehavior.Restrict);

        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}