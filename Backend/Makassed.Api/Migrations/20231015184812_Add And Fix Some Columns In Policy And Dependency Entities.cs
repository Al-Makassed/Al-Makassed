using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Makassed.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddAndFixSomeColumnsInPolicyAndDependencyEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "EstimatedTime",
                table: "Dependencies",
                newName: "EstimatedTimeInMin");

            migrationBuilder.AddColumn<int>(
                name: "EstimatedTimeInMin",
                table: "Policies",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PageCount",
                table: "Policies",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EstimatedTimeInMin",
                table: "Policies");

            migrationBuilder.DropColumn(
                name: "PageCount",
                table: "Policies");

            migrationBuilder.RenameColumn(
                name: "EstimatedTimeInMin",
                table: "Dependencies",
                newName: "EstimatedTime");
        }
    }
}
