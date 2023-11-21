using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Makassed.Api.Migrations
{
    /// <inheritdoc />
    public partial class PrepareEntitiesToSeekApproval : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Policies",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreatorId",
                table: "Policies",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "Policies",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "MonitoringTools",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreatorId",
                table: "MonitoringTools",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "MonitoringTools",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Dependencies",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreatorId",
                table: "Dependencies",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsApproved",
                table: "Dependencies",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Policies_CreatorId",
                table: "Policies",
                column: "CreatorId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MonitoringTools_CreatorId",
                table: "MonitoringTools",
                column: "CreatorId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Dependencies_CreatorId",
                table: "Dependencies",
                column: "CreatorId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Dependencies_Users_CreatorId",
                table: "Dependencies",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MonitoringTools_Users_CreatorId",
                table: "MonitoringTools",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Policies_Users_CreatorId",
                table: "Policies",
                column: "CreatorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Dependencies_Users_CreatorId",
                table: "Dependencies");

            migrationBuilder.DropForeignKey(
                name: "FK_MonitoringTools_Users_CreatorId",
                table: "MonitoringTools");

            migrationBuilder.DropForeignKey(
                name: "FK_Policies_Users_CreatorId",
                table: "Policies");

            migrationBuilder.DropIndex(
                name: "IX_Policies_CreatorId",
                table: "Policies");

            migrationBuilder.DropIndex(
                name: "IX_MonitoringTools_CreatorId",
                table: "MonitoringTools");

            migrationBuilder.DropIndex(
                name: "IX_Dependencies_CreatorId",
                table: "Dependencies");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Policies");

            migrationBuilder.DropColumn(
                name: "CreatorId",
                table: "Policies");

            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "Policies");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "MonitoringTools");

            migrationBuilder.DropColumn(
                name: "CreatorId",
                table: "MonitoringTools");

            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "MonitoringTools");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Dependencies");

            migrationBuilder.DropColumn(
                name: "CreatorId",
                table: "Dependencies");

            migrationBuilder.DropColumn(
                name: "IsApproved",
                table: "Dependencies");
        }
    }
}
