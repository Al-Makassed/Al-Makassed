using Makassed.Api.Data.Configuration;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Makassed.Api.Data;

public class MakassedAuthenticationDbContext : IdentityDbContext<IdentityUser>
{
    public MakassedAuthenticationDbContext(DbContextOptions<MakassedAuthenticationDbContext> options) : base(options)
    {
    }
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Customize the Identity tables names
        builder.Entity<IdentityUser>().ToTable("Users");
        builder.Entity<IdentityRole>().ToTable("Roles");
        builder.Entity<IdentityUserClaim<string>>().ToTable("UserClaims");
        builder.Entity<IdentityUserRole<string>>().ToTable("UserRoles");
        builder.Entity<IdentityUserLogin<string>>().ToTable("UserLogins");
        builder.Entity<IdentityUserToken<string>>().ToTable("UserTokens");
        builder.Entity<IdentityRoleClaim<string>>().ToTable("RoleClaims");

        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        //builder.ApplyConfiguration(new IdentityRoleConfiguration());
    }
} 