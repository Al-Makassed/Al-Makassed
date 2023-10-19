using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Makassed.Api.Data;

public class MakassedAuthenticationDbContext : IdentityDbContext<IdentityUser>
{
    public MakassedAuthenticationDbContext(DbContextOptions<MakassedAuthenticationDbContext> options) : base(options)
    {
    }
    
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        
        builder.HasDefaultSchema("Identity");
    }
}