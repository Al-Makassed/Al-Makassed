using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Makassed.Api.Migrations;

/// <inheritdoc />
public partial class FixDependencyUser : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropForeignKey(
            name: "FK_DependencyUser_Users_UsersId",
            table: "DependencyUser");

        migrationBuilder.RenameColumn(
            name: "UsersId",
            table: "DependencyUser",
            newName: "UserId");

        migrationBuilder.RenameIndex(
            name: "IX_DependencyUser_UsersId",
            table: "DependencyUser",
            newName: "IX_DependencyUser_UserId");

        migrationBuilder.AlterColumn<int>(
            name: "ReadingState",
            table: "DependencyUser",
            type: "int",
            nullable: false,
            defaultValue: 0,
            oldClrType: typeof(int),
            oldType: "int");

        migrationBuilder.AddForeignKey(
            name: "FK_DependencyUser_Users_UserId",
            table: "DependencyUser",
            column: "UserId",
            principalTable: "Users",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropForeignKey(
            name: "FK_DependencyUser_Users_UserId",
            table: "DependencyUser");

        migrationBuilder.RenameColumn(
            name: "UserId",
            table: "DependencyUser",
            newName: "UsersId");

        migrationBuilder.RenameIndex(
            name: "IX_DependencyUser_UserId",
            table: "DependencyUser",
            newName: "IX_DependencyUser_UsersId");

        migrationBuilder.AlterColumn<int>(
            name: "ReadingState",
            table: "DependencyUser",
            type: "int",
            nullable: false,
            oldClrType: typeof(int),
            oldType: "int",
            oldDefaultValue: 0);

        migrationBuilder.AddForeignKey(
            name: "FK_DependencyUser_Users_UsersId",
            table: "DependencyUser",
            column: "UsersId",
            principalTable: "Users",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
    }
}
