using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Makassed.Api.Migrations;

/// <inheritdoc />
public partial class RenameColumnPolicyUserAndDependencyUser : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.RenameColumn(
            name: "LastModified",
            table: "PolicyUsers",
            newName: "LastAccessed");

        migrationBuilder.RenameColumn(
            name: "LastModified",
            table: "DependencyUsers",
            newName: "LastAccessed");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.RenameColumn(
            name: "LastAccessed",
            table: "PolicyUsers",
            newName: "LastModified");

        migrationBuilder.RenameColumn(
            name: "LastAccessed",
            table: "DependencyUsers",
            newName: "LastModified");
    }
}
