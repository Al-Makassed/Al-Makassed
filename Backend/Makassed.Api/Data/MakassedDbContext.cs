using Makassed.Api.Models;
using Makassed.Api.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace Makassed.Api.Data
{
    public class MakassedDbContext : DbContext
    {
        public MakassedDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Chapter> Chapters { get; set; } = null!;
        public DbSet<Policy> Policies { get; set; } = null!;
        public DbSet<Dependency> Dependencies { get; set; } = null!;

        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
        //     base.OnModelCreating(modelBuilder);
        // }
    }
}
