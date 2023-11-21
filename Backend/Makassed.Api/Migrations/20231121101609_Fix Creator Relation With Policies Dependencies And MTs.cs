using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Makassed.Api.Migrations;

/// <inheritdoc />
public partial class FixCreatorRelationWithPoliciesDependenciesAndMTs : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropIndex(
            name: "IX_Policies_CreatorId",
            table: "Policies");

        migrationBuilder.DropIndex(
            name: "IX_MonitoringTools_CreatorId",
            table: "MonitoringTools");

        migrationBuilder.DropIndex(
            name: "IX_Dependencies_CreatorId",
            table: "Dependencies");

        migrationBuilder.CreateIndex(
            name: "IX_Policies_CreatorId",
            table: "Policies",
            column: "CreatorId");

        migrationBuilder.CreateIndex(
            name: "IX_MonitoringTools_CreatorId",
            table: "MonitoringTools",
            column: "CreatorId");

        migrationBuilder.CreateIndex(
            name: "IX_Dependencies_CreatorId",
            table: "Dependencies",
            column: "CreatorId");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropIndex(
            name: "IX_Policies_CreatorId",
            table: "Policies");

        migrationBuilder.DropIndex(
            name: "IX_MonitoringTools_CreatorId",
            table: "MonitoringTools");

        migrationBuilder.DropIndex(
            name: "IX_Dependencies_CreatorId",
            table: "Dependencies");

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
    }
}
