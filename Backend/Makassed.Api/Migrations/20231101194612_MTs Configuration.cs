using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Makassed.Api.Migrations
{
    /// <inheritdoc />
    public partial class MTsConfiguration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DepartmentMonitoringTool");

            migrationBuilder.DropTable(
                name: "FieldMonitoringTool");

            migrationBuilder.CreateTable(
                name: "MonitoringToolDepartments",
                columns: table => new
                {
                    MonitoringToolId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DepartmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MonitoringToolDepartments", x => new { x.DepartmentId, x.MonitoringToolId });
                    table.ForeignKey(
                        name: "FK_MonitoringToolDepartments_Departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MonitoringToolDepartments_MonitoringTools_MonitoringToolId",
                        column: x => x.MonitoringToolId,
                        principalTable: "MonitoringTools",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MonitoringToolFields",
                columns: table => new
                {
                    MonitoringToolId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FieldId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MonitoringToolFields", x => new { x.FieldId, x.MonitoringToolId });
                    table.ForeignKey(
                        name: "FK_MonitoringToolFields_Fields_FieldId",
                        column: x => x.FieldId,
                        principalTable: "Fields",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MonitoringToolFields_MonitoringTools_MonitoringToolId",
                        column: x => x.MonitoringToolId,
                        principalTable: "MonitoringTools",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Submission",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MonitoringToolId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DepartmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SubmitterId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Version = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Submission", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Submission_MonitoringToolDepartments_MonitoringToolId_DepartmentId",
                        columns: x => new { x.MonitoringToolId, x.DepartmentId },
                        principalTable: "MonitoringToolDepartments",
                        principalColumns: new[] { "DepartmentId", "MonitoringToolId" },
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Submission_Users_SubmitterId",
                        column: x => x.SubmitterId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MonitoringToolFieldsSubmissions",
                columns: table => new
                {
                    MonitoringToolId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FieldId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SubmissionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Answer = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MonitoringToolFieldsSubmissions", x => new { x.MonitoringToolId, x.FieldId, x.SubmissionId });
                    table.ForeignKey(
                        name: "FK_MonitoringToolFieldsSubmissions_MonitoringToolFields_MonitoringToolId_FieldId",
                        columns: x => new { x.MonitoringToolId, x.FieldId },
                        principalTable: "MonitoringToolFields",
                        principalColumns: new[] { "FieldId", "MonitoringToolId" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MonitoringToolFieldsSubmissions_Submission_SubmissionId",
                        column: x => x.SubmissionId,
                        principalTable: "Submission",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MonitoringToolDepartments_MonitoringToolId",
                table: "MonitoringToolDepartments",
                column: "MonitoringToolId");

            migrationBuilder.CreateIndex(
                name: "IX_MonitoringToolFields_MonitoringToolId",
                table: "MonitoringToolFields",
                column: "MonitoringToolId");

            migrationBuilder.CreateIndex(
                name: "IX_MonitoringToolFieldsSubmissions_SubmissionId",
                table: "MonitoringToolFieldsSubmissions",
                column: "SubmissionId");

            migrationBuilder.CreateIndex(
                name: "IX_Submission_MonitoringToolId_DepartmentId",
                table: "Submission",
                columns: new[] { "MonitoringToolId", "DepartmentId" });

            migrationBuilder.CreateIndex(
                name: "IX_Submission_SubmitterId",
                table: "Submission",
                column: "SubmitterId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MonitoringToolFieldsSubmissions");

            migrationBuilder.DropTable(
                name: "MonitoringToolFields");

            migrationBuilder.DropTable(
                name: "Submission");

            migrationBuilder.DropTable(
                name: "MonitoringToolDepartments");

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
                name: "IX_DepartmentMonitoringTool_MonitoringToolsId",
                table: "DepartmentMonitoringTool",
                column: "MonitoringToolsId");

            migrationBuilder.CreateIndex(
                name: "IX_FieldMonitoringTool_MonitoringToolsId",
                table: "FieldMonitoringTool",
                column: "MonitoringToolsId");
        }
    }
}
