using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Makassed.Api.Migrations
{
    /// <inheritdoc />
    public partial class fixstructuremigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dependencies_DependencyTypes_DependencyTypeId",
                table: "Dependencies");

            migrationBuilder.DropTable(
                name: "DependencyTypes");

            migrationBuilder.DropIndex(
                name: "IX_Dependencies_DependencyTypeId",
                table: "Dependencies");

            migrationBuilder.RenameColumn(
                name: "state",
                table: "Policies",
                newName: "State");

            migrationBuilder.RenameColumn(
                name: "State",
                table: "Chapters",
                newName: "EnableState");

            migrationBuilder.AddColumn<int>(
                name: "DependencyType",
                table: "Dependencies",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DependencyType",
                table: "Dependencies");

            migrationBuilder.RenameColumn(
                name: "State",
                table: "Policies",
                newName: "state");

            migrationBuilder.RenameColumn(
                name: "EnableState",
                table: "Chapters",
                newName: "State");

            migrationBuilder.CreateTable(
                name: "DependencyTypes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DependencyTypes", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "DependencyTypes",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("78aef275-1b5e-4744-a5fc-7ec43c5fe8dd"), "Protocol" },
                    { new Guid("c4e7a739-af60-42e1-9732-52fbb8ade250"), "Poster" },
                    { new Guid("fc01eb00-6fce-4fcc-a7fe-60164bd9830f"), "Form" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Dependencies_DependencyTypeId",
                table: "Dependencies",
                column: "DependencyTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Dependencies_DependencyTypes_DependencyTypeId",
                table: "Dependencies",
                column: "DependencyTypeId",
                principalTable: "DependencyTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
