using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Makassed.Api.Migrations
{
    /// <inheritdoc />
    public partial class _ : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DependencyUser_Dependencies_DependencyId",
                table: "DependencyUser");

            migrationBuilder.DropForeignKey(
                name: "FK_DependencyUser_Users_UserId",
                table: "DependencyUser");

            migrationBuilder.DropForeignKey(
                name: "FK_PolicyUser_Policies_PolicyId",
                table: "PolicyUser");

            migrationBuilder.DropForeignKey(
                name: "FK_PolicyUser_Users_UserId",
                table: "PolicyUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PolicyUser",
                table: "PolicyUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DependencyUser",
                table: "DependencyUser");

            migrationBuilder.RenameTable(
                name: "PolicyUser",
                newName: "PolicyUsers");

            migrationBuilder.RenameTable(
                name: "DependencyUser",
                newName: "DependencyUsers");

            migrationBuilder.RenameIndex(
                name: "IX_PolicyUser_UserId",
                table: "PolicyUsers",
                newName: "IX_PolicyUsers_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_DependencyUser_UserId",
                table: "DependencyUsers",
                newName: "IX_DependencyUsers_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PolicyUsers",
                table: "PolicyUsers",
                columns: new[] { "PolicyId", "UserId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_DependencyUsers",
                table: "DependencyUsers",
                columns: new[] { "DependencyId", "UserId" });

            migrationBuilder.AddForeignKey(
                name: "FK_DependencyUsers_Dependencies_DependencyId",
                table: "DependencyUsers",
                column: "DependencyId",
                principalTable: "Dependencies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DependencyUsers_Users_UserId",
                table: "DependencyUsers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PolicyUsers_Policies_PolicyId",
                table: "PolicyUsers",
                column: "PolicyId",
                principalTable: "Policies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PolicyUsers_Users_UserId",
                table: "PolicyUsers",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DependencyUsers_Dependencies_DependencyId",
                table: "DependencyUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_DependencyUsers_Users_UserId",
                table: "DependencyUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_PolicyUsers_Policies_PolicyId",
                table: "PolicyUsers");

            migrationBuilder.DropForeignKey(
                name: "FK_PolicyUsers_Users_UserId",
                table: "PolicyUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PolicyUsers",
                table: "PolicyUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DependencyUsers",
                table: "DependencyUsers");

            migrationBuilder.RenameTable(
                name: "PolicyUsers",
                newName: "PolicyUser");

            migrationBuilder.RenameTable(
                name: "DependencyUsers",
                newName: "DependencyUser");

            migrationBuilder.RenameIndex(
                name: "IX_PolicyUsers_UserId",
                table: "PolicyUser",
                newName: "IX_PolicyUser_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_DependencyUsers_UserId",
                table: "DependencyUser",
                newName: "IX_DependencyUser_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PolicyUser",
                table: "PolicyUser",
                columns: new[] { "PolicyId", "UserId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_DependencyUser",
                table: "DependencyUser",
                columns: new[] { "DependencyId", "UserId" });

            migrationBuilder.AddForeignKey(
                name: "FK_DependencyUser_Dependencies_DependencyId",
                table: "DependencyUser",
                column: "DependencyId",
                principalTable: "Dependencies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DependencyUser_Users_UserId",
                table: "DependencyUser",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PolicyUser_Policies_PolicyId",
                table: "PolicyUser",
                column: "PolicyId",
                principalTable: "Policies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PolicyUser_Users_UserId",
                table: "PolicyUser",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
