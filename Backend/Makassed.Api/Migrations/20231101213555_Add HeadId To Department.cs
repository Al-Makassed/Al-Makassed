using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Makassed.Api.Migrations;

/// <inheritdoc />
public partial class AddHeadIdToDepartment : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<string>(
            name: "HeadId",
            table: "Departments",
            type: "nvarchar(450)",
            nullable: true);

        migrationBuilder.CreateIndex(
            name: "IX_Departments_HeadId",
            table: "Departments",
            column: "HeadId",
            unique: true,
            filter: "[HeadId] IS NOT NULL");

        migrationBuilder.AddForeignKey(
            name: "FK_Departments_Users_HeadId",
            table: "Departments",
            column: "HeadId",
            principalTable: "Users",
            principalColumn: "Id",
            onDelete: ReferentialAction.Restrict);
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropForeignKey(
            name: "FK_Departments_Users_HeadId",
            table: "Departments");

        migrationBuilder.DropIndex(
            name: "IX_Departments_HeadId",
            table: "Departments");

        migrationBuilder.DropColumn(
            name: "HeadId",
            table: "Departments");
    }
}
