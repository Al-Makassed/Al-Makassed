using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Makassed.Api.Migrations;

/// <inheritdoc />
public partial class FixPolicyUser : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropForeignKey(
            name: "FK_PolicyUser_Users_UsersId",
            table: "PolicyUser");

        migrationBuilder.RenameColumn(
            name: "UsersId",
            table: "PolicyUser",
            newName: "UserId");

        migrationBuilder.RenameIndex(
            name: "IX_PolicyUser_UsersId",
            table: "PolicyUser",
            newName: "IX_PolicyUser_UserId");

        migrationBuilder.AlterColumn<int>(
            name: "ReadingState",
            table: "PolicyUser",
            type: "int",
            nullable: false,
            defaultValue: 0,
            oldClrType: typeof(int),
            oldType: "int");

        migrationBuilder.AddForeignKey(
            name: "FK_PolicyUser_Users_UserId",
            table: "PolicyUser",
            column: "UserId",
            principalTable: "Users",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropForeignKey(
            name: "FK_PolicyUser_Users_UserId",
            table: "PolicyUser");

        migrationBuilder.RenameColumn(
            name: "UserId",
            table: "PolicyUser",
            newName: "UsersId");

        migrationBuilder.RenameIndex(
            name: "IX_PolicyUser_UserId",
            table: "PolicyUser",
            newName: "IX_PolicyUser_UsersId");

        migrationBuilder.AlterColumn<int>(
            name: "ReadingState",
            table: "PolicyUser",
            type: "int",
            nullable: false,
            oldClrType: typeof(int),
            oldType: "int",
            oldDefaultValue: 0);

        migrationBuilder.AddForeignKey(
            name: "FK_PolicyUser_Users_UsersId",
            table: "PolicyUser",
            column: "UsersId",
            principalTable: "Users",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
    }
}
