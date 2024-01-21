using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Makassed.Api.Migrations
{
    /// <inheritdoc />
    public partial class RemoveDuplicatedUserIdColumnFromDependencyUserandPolicyUserTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "PolicyUser");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "DependencyUser");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "PolicyUser",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "DependencyUser",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
