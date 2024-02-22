using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Makassed.Api.Migrations;

/// <inheritdoc />
public partial class AddCategoryEntity : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<Guid>(
            name: "CategoryId",
            table: "Fields",
            type: "uniqueidentifier",
            nullable: false,
            defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

        migrationBuilder.CreateTable(
            name: "Categories",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Categories", x => x.Id);
            });

        migrationBuilder.CreateIndex(
            name: "IX_Fields_CategoryId",
            table: "Fields",
            column: "CategoryId");

        migrationBuilder.AddForeignKey(
            name: "FK_Fields_Categories_CategoryId",
            table: "Fields",
            column: "CategoryId",
            principalTable: "Categories",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropForeignKey(
            name: "FK_Fields_Categories_CategoryId",
            table: "Fields");

        migrationBuilder.DropTable(
            name: "Categories");

        migrationBuilder.DropIndex(
            name: "IX_Fields_CategoryId",
            table: "Fields");

        migrationBuilder.DropColumn(
            name: "CategoryId",
            table: "Fields");
    }
}
