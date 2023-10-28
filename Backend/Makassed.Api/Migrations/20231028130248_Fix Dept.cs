using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Makassed.Api.Migrations
{
    /// <inheritdoc />
    public partial class FixDept : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MonitoringTools_Departments_DepartmentId",
                table: "MonitoringTools");

            migrationBuilder.DropIndex(
                name: "IX_MonitoringTools_DepartmentId",
                table: "MonitoringTools");

            migrationBuilder.DropColumn(
                name: "DepartmentId",
                table: "MonitoringTools");

            migrationBuilder.CreateTable(
                name: "DepartmentMonitoringTool",
                columns: table => new
                {
                    DepartmentsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MonitoringToolsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DepartmentMonitoringTool", x => new { x.DepartmentsId, x.MonitoringToolsId });
                    table.ForeignKey(
                        name: "FK_DepartmentMonitoringTool_Departments_DepartmentsId",
                        column: x => x.DepartmentsId,
                        principalTable: "Departments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DepartmentMonitoringTool_MonitoringTools_MonitoringToolsId",
                        column: x => x.MonitoringToolsId,
                        principalTable: "MonitoringTools",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DepartmentMonitoringTool_MonitoringToolsId",
                table: "DepartmentMonitoringTool",
                column: "MonitoringToolsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DepartmentMonitoringTool");

            migrationBuilder.AddColumn<Guid>(
                name: "DepartmentId",
                table: "MonitoringTools",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MonitoringTools_DepartmentId",
                table: "MonitoringTools",
                column: "DepartmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_MonitoringTools_Departments_DepartmentId",
                table: "MonitoringTools",
                column: "DepartmentId",
                principalTable: "Departments",
                principalColumn: "Id");
        }
    }
}
