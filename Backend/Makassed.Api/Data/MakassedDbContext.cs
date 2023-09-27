using Makassed.Api.Data.Configurations;
using Makassed.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Makassed.Api.Data
{
    public class MakassedDbContext : DbContext
    {
        public MakassedDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Chapter> Chapters { get; set; }
        public DbSet<Policy> Policies { get; set; }
        public DbSet<Dependency> Dependencies { get; set; }
        public DbSet<DependencyType> DependencyTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new DependencyTypeConfiguration());
        }

    }
}
