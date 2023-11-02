using Makassed.Api.Models.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Makassed.Api.Data.Configuration;

public static class IdentityTablesConfiguration
{
    public static void CustomizeIdentityTablesNames(this ModelBuilder modelBuilder) 
    {
        modelBuilder.Entity<MakassedUser>().ToTable("Users");

        modelBuilder.Entity<IdentityRole>().ToTable("Roles");

        modelBuilder.Entity<IdentityUserClaim<string>>().ToTable("UserClaims");

        modelBuilder.Entity<IdentityUserRole<string>>().ToTable("UserRoles");

        modelBuilder.Entity<IdentityUserLogin<string>>().ToTable("UserLogins");

        modelBuilder.Entity<IdentityUserToken<string>>().ToTable("UserTokens");

        modelBuilder.Entity<IdentityRoleClaim<string>>().ToTable("RoleClaims");
    }
}