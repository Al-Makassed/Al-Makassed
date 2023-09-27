using Makassed.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Makassed.Api.Data.Configurations
{
    public class DependencyTypeConfiguration : IEntityTypeConfiguration<DependencyType>
    {
        public void Configure(EntityTypeBuilder<DependencyType> builder)
        {
            var types = new List<DependencyType>
            {
                new () {
                    Id = Guid.Parse("fc01eb00-6fce-4fcc-a7fe-60164bd9830f"),
                    Name = "Form"
                },
                new () {
                    Id = Guid.Parse("c4e7a739-af60-42e1-9732-52fbb8ade250"),
                    Name = "Poster"
                },
                new () {
                    Id = Guid.Parse("78aef275-1b5e-4744-a5fc-7ec43c5fe8dd"),
                    Name = "Protocol"
                }
            };

            builder.HasData(types);
        }
    }
}
