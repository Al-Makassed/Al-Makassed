using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Makassed.Api.Migrations
{
    /// <inheritdoc />
    public partial class RebuildDatabaseForMTSection : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Submissions_MonitoringToolDepartments_MonitoringToolId_DepartmentId",
                table: "Submissions");

            migrationBuilder.DropTable(
                name: "MonitoringToolDepartments");

            migrationBuilder.DropTable(
                name: "MonitoringToolFieldsSubmissions");

            migrationBuilder.DropTable(
                name: "MonitoringToolFields");

            migrationBuilder.DropIndex(
                name: "IX_Submissions_MonitoringToolId_DepartmentId",
                table: "Submissions");

            migrationBuilder.DropColumn(
                name: "DepartmentId",
                table: "Submissions");

            migrationBuilder.RenameColumn(
                name: "Version",
                table: "Submissions",
                newName: "Number");

            migrationBuilder.RenameColumn(
                name: "MonitoringToolId",
                table: "Submissions",
                newName: "FocalPointTaskId");

            migrationBuilder.AddColumn<DateTime>(
                name: "SubmittedAt",
                table: "Submissions",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "FieldAnswers",
                columns: table => new
                {
                    FieldId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SubmissionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Answer = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FieldAnswers", x => new { x.FieldId, x.SubmissionId });
                    table.ForeignKey(
                        name: "FK_FieldAnswers_Fields_FieldId",
                        column: x => x.FieldId,
                        principalTable: "Fields",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FieldAnswers_Submissions_SubmissionId",
                        column: x => x.SubmissionId,
                        principalTable: "Submissions",
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

            migrationBuilder.CreateTable(
                name: "FocalPointTasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MonitoringToolId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DepartmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TotalSubmissions = table.Column<int>(type: "int", nullable: false),
                    IsFinished = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FocalPointTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FocalPointTasks_Departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FocalPointTasks_MonitoringTools_MonitoringToolId",
                        column: x => x.MonitoringToolId,
                        principalTable: "MonitoringTools",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Submissions_FocalPointTaskId",
                table: "Submissions",
                column: "FocalPointTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_FieldAnswers_SubmissionId",
                table: "FieldAnswers",
                column: "SubmissionId");

            migrationBuilder.CreateIndex(
                name: "IX_FieldMonitoringTool_MonitoringToolsId",
                table: "FieldMonitoringTool",
                column: "MonitoringToolsId");

            migrationBuilder.CreateIndex(
                name: "IX_FocalPointTasks_DepartmentId",
                table: "FocalPointTasks",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_FocalPointTasks_MonitoringToolId",
                table: "FocalPointTasks",
                column: "MonitoringToolId");

            migrationBuilder.AddForeignKey(
                name: "FK_Submissions_FocalPointTasks_FocalPointTaskId",
                table: "Submissions",
                column: "FocalPointTaskId",
                principalTable: "FocalPointTasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Submissions_FocalPointTasks_FocalPointTaskId",
                table: "Submissions");

            migrationBuilder.DropTable(
                name: "FieldAnswers");

            migrationBuilder.DropTable(
                name: "FieldMonitoringTool");

            migrationBuilder.DropTable(
                name: "FocalPointTasks");

            migrationBuilder.DropIndex(
                name: "IX_Submissions_FocalPointTaskId",
                table: "Submissions");

            migrationBuilder.DropColumn(
                name: "SubmittedAt",
                table: "Submissions");

            migrationBuilder.RenameColumn(
                name: "Number",
                table: "Submissions",
                newName: "Version");

            migrationBuilder.RenameColumn(
                name: "FocalPointTaskId",
                table: "Submissions",
                newName: "MonitoringToolId");

            migrationBuilder.AddColumn<Guid>(
                name: "DepartmentId",
                table: "Submissions",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "MonitoringToolDepartments",
                columns: table => new
                {
                    DepartmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MonitoringToolId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
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
                    FieldId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MonitoringToolId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
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
                        name: "FK_MonitoringToolFieldsSubmissions_Submissions_SubmissionId",
                        column: x => x.SubmissionId,
                        principalTable: "Submissions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Submissions_MonitoringToolId_DepartmentId",
                table: "Submissions",
                columns: new[] { "MonitoringToolId", "DepartmentId" });

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

            migrationBuilder.AddForeignKey(
                name: "FK_Submissions_MonitoringToolDepartments_MonitoringToolId_DepartmentId",
                table: "Submissions",
                columns: new[] { "MonitoringToolId", "DepartmentId" },
                principalTable: "MonitoringToolDepartments",
                principalColumns: new[] { "DepartmentId", "MonitoringToolId" },
                onDelete: ReferentialAction.Cascade);
        }
    }
}
