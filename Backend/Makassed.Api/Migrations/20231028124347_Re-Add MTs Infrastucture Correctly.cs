using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Makassed.Api.Migrations
{
    /// <inheritdoc />
    public partial class ReAddMTsInfrastuctureCorrectly : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Departments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Departments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Fields",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fields", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MonitoringTools",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DepartmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MonitoringTools", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MonitoringTools_Departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "FieldMonitoringTool",
                columns: table => new
                {
                    FieldsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MonitoringToolsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FieldMonitoringTool", x => new { x.FieldsId, x.MonitoringToolsId });
                    table.ForeignKey(
                        name: "FK_FieldMonitoringTool_Fields_FieldsId",
                        column: x => x.FieldsId,
                        principalTable: "Fields",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FieldMonitoringTool_MonitoringTools_MonitoringToolsId",
                        column: x => x.MonitoringToolsId,
                        principalTable: "MonitoringTools",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FieldMonitoringTool_MonitoringToolsId",
                table: "FieldMonitoringTool",
                column: "MonitoringToolsId");

            migrationBuilder.CreateIndex(
                name: "IX_MonitoringTools_DepartmentId",
                table: "MonitoringTools",
                column: "DepartmentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FieldMonitoringTool");

            migrationBuilder.DropTable(
                name: "Fields");

            migrationBuilder.DropTable(
                name: "MonitoringTools");

            migrationBuilder.DropTable(
                name: "Departments");
        }
    }
}
