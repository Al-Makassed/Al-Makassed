using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Makassed.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddDependencyID : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DependencyUser_Dependencies_DependencyCode",
                table: "DependencyUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DependencyUser",
                table: "DependencyUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Dependencies",
                table: "Dependencies");

            migrationBuilder.DropColumn(
                name: "DependencyCode",
                table: "DependencyUser");

            migrationBuilder.AddColumn<Guid>(
                name: "DependencyId",
                table: "DependencyUser",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "Dependencies",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "Dependencies",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_DependencyUser",
                table: "DependencyUser",
                columns: new[] { "DependencyId", "UsersId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Dependencies",
                table: "Dependencies",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DependencyUser_Dependencies_DependencyId",
                table: "DependencyUser",
                column: "DependencyId",
                principalTable: "Dependencies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DependencyUser_Dependencies_DependencyId",
                table: "DependencyUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DependencyUser",
                table: "DependencyUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Dependencies",
                table: "Dependencies");

            migrationBuilder.DropColumn(
                name: "DependencyId",
                table: "DependencyUser");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Dependencies");

            migrationBuilder.AddColumn<string>(
                name: "DependencyCode",
                table: "DependencyUser",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "Dependencies",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DependencyUser",
                table: "DependencyUser",
                columns: new[] { "DependencyCode", "UsersId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Dependencies",
                table: "Dependencies",
                column: "Code");

            migrationBuilder.AddForeignKey(
                name: "FK_DependencyUser_Dependencies_DependencyCode",
                table: "DependencyUser",
                column: "DependencyCode",
                principalTable: "Dependencies",
                principalColumn: "Code",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
