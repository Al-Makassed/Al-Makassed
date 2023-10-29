using Makassed.Api.Models.Domain;
using Microsoft.AspNetCore.Identity;
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

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Department>()
            .HasMany(e => e.MonitoringTools)
            .WithMany(e => e.Departments);



        // Customize the Identity tables names
        builder.Entity<MakassedUser>().ToTable("Users");
        builder.Entity<IdentityRole>().ToTable("Roles");
        builder.Entity<IdentityUserClaim<string>>().ToTable("UserClaims");
        builder.Entity<IdentityUserRole<string>>().ToTable("UserRoles");
        builder.Entity<IdentityUserLogin<string>>().ToTable("UserLogins");
        builder.Entity<IdentityUserToken<string>>().ToTable("UserTokens");
        builder.Entity<IdentityRoleClaim<string>>().ToTable("RoleClaims");

        builder.Entity<MakassedUser>()
            .HasMany(u => u.Policies)
            .WithMany(p => p.Users)
            .UsingEntity<PolicyUser>();

        builder.Entity<MakassedUser>()
            .HasMany(u => u.PolicyDependencies)
            .WithMany(d => d.Users)
            .UsingEntity<DependencyUser>();

        builder.Entity<MakassedUser>()
            .HasOne(u => u.Department)
            .WithMany(d => d.Users);

        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
