using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Makassed.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddPolicySammary : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Summary",
                table: "Policies",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Summary",
                table: "Policies");
        }
    }
}
