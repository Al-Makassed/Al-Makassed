using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Makassed.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddSubmissionsEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MonitoringToolFieldsSubmissions_Submission_SubmissionId",
                table: "MonitoringToolFieldsSubmissions");

            migrationBuilder.DropForeignKey(
                name: "FK_Submission_MonitoringToolDepartments_MonitoringToolId_DepartmentId",
                table: "Submission");

            migrationBuilder.DropForeignKey(
                name: "FK_Submission_Users_SubmitterId",
                table: "Submission");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Submission",
                table: "Submission");

            migrationBuilder.RenameTable(
                name: "Submission",
                newName: "Submissions");

            migrationBuilder.RenameIndex(
                name: "IX_Submission_SubmitterId",
                table: "Submissions",
                newName: "IX_Submissions_SubmitterId");

            migrationBuilder.RenameIndex(
                name: "IX_Submission_MonitoringToolId_DepartmentId",
                table: "Submissions",
                newName: "IX_Submissions_MonitoringToolId_DepartmentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Submissions",
                table: "Submissions",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MonitoringToolFieldsSubmissions_Submissions_SubmissionId",
                table: "MonitoringToolFieldsSubmissions",
                column: "SubmissionId",
                principalTable: "Submissions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Submissions_MonitoringToolDepartments_MonitoringToolId_DepartmentId",
                table: "Submissions",
                columns: new[] { "MonitoringToolId", "DepartmentId" },
                principalTable: "MonitoringToolDepartments",
                principalColumns: new[] { "DepartmentId", "MonitoringToolId" },
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Submissions_Users_SubmitterId",
                table: "Submissions",
                column: "SubmitterId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MonitoringToolFieldsSubmissions_Submissions_SubmissionId",
                table: "MonitoringToolFieldsSubmissions");

            migrationBuilder.DropForeignKey(
                name: "FK_Submissions_MonitoringToolDepartments_MonitoringToolId_DepartmentId",
                table: "Submissions");

            migrationBuilder.DropForeignKey(
                name: "FK_Submissions_Users_SubmitterId",
                table: "Submissions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Submissions",
                table: "Submissions");

            migrationBuilder.RenameTable(
                name: "Submissions",
                newName: "Submission");

            migrationBuilder.RenameIndex(
                name: "IX_Submissions_SubmitterId",
                table: "Submission",
                newName: "IX_Submission_SubmitterId");

            migrationBuilder.RenameIndex(
                name: "IX_Submissions_MonitoringToolId_DepartmentId",
                table: "Submission",
                newName: "IX_Submission_MonitoringToolId_DepartmentId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Submission",
                table: "Submission",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MonitoringToolFieldsSubmissions_Submission_SubmissionId",
                table: "MonitoringToolFieldsSubmissions",
                column: "SubmissionId",
                principalTable: "Submission",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Submission_MonitoringToolDepartments_MonitoringToolId_DepartmentId",
                table: "Submission",
                columns: new[] { "MonitoringToolId", "DepartmentId" },
                principalTable: "MonitoringToolDepartments",
                principalColumns: new[] { "DepartmentId", "MonitoringToolId" },
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Submission_Users_SubmitterId",
                table: "Submission",
                column: "SubmitterId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
