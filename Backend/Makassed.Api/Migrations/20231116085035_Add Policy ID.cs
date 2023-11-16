using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Makassed.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddPolicyID : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dependencies_Policies_PolicyCode",
                table: "Dependencies");

            migrationBuilder.DropForeignKey(
                name: "FK_PolicyUser_Policies_PolicyCode",
                table: "PolicyUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PolicyUser",
                table: "PolicyUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Policies",
                table: "Policies");

            migrationBuilder.DropIndex(
                name: "IX_Dependencies_PolicyCode",
                table: "Dependencies");

            migrationBuilder.DropColumn(
                name: "PolicyCode",
                table: "PolicyUser");

            migrationBuilder.DropColumn(
                name: "PolicyCode",
                table: "Dependencies");

            migrationBuilder.AddColumn<Guid>(
                name: "PolicyId",
                table: "PolicyUser",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "Policies",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "Policies",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "PolicyId",
                table: "Dependencies",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_PolicyUser",
                table: "PolicyUser",
                columns: new[] { "PolicyId", "UsersId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Policies",
                table: "Policies",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Dependencies_PolicyId",
                table: "Dependencies",
                column: "PolicyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Dependencies_Policies_PolicyId",
                table: "Dependencies",
                column: "PolicyId",
                principalTable: "Policies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PolicyUser_Policies_PolicyId",
                table: "PolicyUser",
                column: "PolicyId",
                principalTable: "Policies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dependencies_Policies_PolicyId",
                table: "Dependencies");

            migrationBuilder.DropForeignKey(
                name: "FK_PolicyUser_Policies_PolicyId",
                table: "PolicyUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PolicyUser",
                table: "PolicyUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Policies",
                table: "Policies");

            migrationBuilder.DropIndex(
                name: "IX_Dependencies_PolicyId",
                table: "Dependencies");

            migrationBuilder.DropColumn(
                name: "PolicyId",
                table: "PolicyUser");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Policies");

            migrationBuilder.DropColumn(
                name: "PolicyId",
                table: "Dependencies");

            migrationBuilder.AddColumn<string>(
                name: "PolicyCode",
                table: "PolicyUser",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "Policies",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "PolicyCode",
                table: "Dependencies",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PolicyUser",
                table: "PolicyUser",
                columns: new[] { "PolicyCode", "UsersId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Policies",
                table: "Policies",
                column: "Code");

            migrationBuilder.CreateIndex(
                name: "IX_Dependencies_PolicyCode",
                table: "Dependencies",
                column: "PolicyCode");

            migrationBuilder.AddForeignKey(
                name: "FK_Dependencies_Policies_PolicyCode",
                table: "Dependencies",
                column: "PolicyCode",
                principalTable: "Policies",
                principalColumn: "Code",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PolicyUser_Policies_PolicyCode",
                table: "PolicyUser",
                column: "PolicyCode",
                principalTable: "Policies",
                principalColumn: "Code",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
