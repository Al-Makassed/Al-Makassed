using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Makassed.Api.Data.Configuration;

public class IdentityRoleConfiguration : IEntityTypeConfiguration<IdentityRole>
{
    public void Configure(EntityTypeBuilder<IdentityRole> builder)
    {
        var adminRoleId = "85e232cf-0f1e-46b6-9137-f9d587807c0c";
        var subAdminRoleId = "f2cb2812-ed29-4dd5-b456-eddf25eb379f";
        var staffRoleId = "1f0f8201-bd6f-421d-9755-7228313a99e7";
        var focalPointRoleId = "d6f83077-ee53-4d48-bb2c-b88f8834be58";

        builder.HasData(
            new IdentityRole
            {
                Id = adminRoleId,
                ConcurrencyStamp = adminRoleId,
                Name = "Admin",
                NormalizedName = "ADMIN"
            },
            new IdentityRole
            {
                Id = subAdminRoleId,
                ConcurrencyStamp = subAdminRoleId,
                Name = "Sub-Admin",
                NormalizedName = "SUB-ADMIN"
            },
            new IdentityRole
            {
                Id = staffRoleId,
                ConcurrencyStamp = staffRoleId,
                Name = "Staff",
                NormalizedName = "STAFF"
            },
            new IdentityRole
            {
                Id = focalPointRoleId,
                ConcurrencyStamp = focalPointRoleId,
                Name = "Focal Point",
                NormalizedName = "Focal Point".ToUpper()
            }
        );
    }
}
