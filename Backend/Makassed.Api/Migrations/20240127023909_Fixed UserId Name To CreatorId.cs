using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Makassed.Api.Migrations
{
    /// <inheritdoc />
    public partial class FixedUserIdNameToCreatorId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Announcements_Users_CreatorId",
                table: "Announcements");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Announcements");

            migrationBuilder.AlterColumn<string>(
                name: "CreatorId",
                table: "Announcements",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Announcements_Users_CreatorId",
                table: "Announcements",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Announcements_Users_CreatorId",
                table: "Announcements");

            migrationBuilder.AlterColumn<string>(
                name: "CreatorId",
                table: "Announcements",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Announcements",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Announcements_Users_CreatorId",
                table: "Announcements",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
