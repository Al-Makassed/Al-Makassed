using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Makassed.Api.Migrations;

/// <inheritdoc />
public partial class fixsomecolumnsnaming : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            name: "DependencyTypeId",
            table: "Dependencies");

        migrationBuilder.RenameColumn(
            name: "DependencyType",
            table: "Dependencies",
            newName: "PolicyDependencyType");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.RenameColumn(
            name: "PolicyDependencyType",
            table: "Dependencies",
            newName: "DependencyType");

        migrationBuilder.AddColumn<Guid>(
            name: "DependencyTypeId",
            table: "Dependencies",
            type: "uniqueidentifier",
            nullable: false,
            defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
    }
}
