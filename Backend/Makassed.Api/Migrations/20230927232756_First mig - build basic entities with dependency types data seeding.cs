using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Makassed.Api.Migrations
{
    /// <inheritdoc />
    public partial class Firstmigbuildbasicentitieswithdependencytypesdataseeding : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Chapters",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    State = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chapters", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DependencyTypes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DependencyTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Policies",
                columns: table => new
                {
                    Code = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    state = table.Column<bool>(type: "bit", nullable: false),
                    PdfUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ChapterId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Policies", x => x.Code);
                    table.ForeignKey(
                        name: "FK_Policies_Chapters_ChapterId",
                        column: x => x.ChapterId,
                        principalTable: "Chapters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Dependencies",
                columns: table => new
                {
                    Code = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PdfUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EstimatedTime = table.Column<int>(type: "int", nullable: false),
                    PagesCount = table.Column<int>(type: "int", nullable: false),
                    PolicyCode = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    DependencyTypeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dependencies", x => x.Code);
                    table.ForeignKey(
                        name: "FK_Dependencies_DependencyTypes_DependencyTypeId",
                        column: x => x.DependencyTypeId,
                        principalTable: "DependencyTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Dependencies_Policies_PolicyCode",
                        column: x => x.PolicyCode,
                        principalTable: "Policies",
                        principalColumn: "Code",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "DependencyTypes",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("78aef275-1b5e-4744-a5fc-7ec43c5fe8dd"), "Protocol" },
                    { new Guid("c4e7a739-af60-42e1-9732-52fbb8ade250"), "Poster" },
                    { new Guid("fc01eb00-6fce-4fcc-a7fe-60164bd9830f"), "Form" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Dependencies_DependencyTypeId",
                table: "Dependencies",
                column: "DependencyTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Dependencies_PolicyCode",
                table: "Dependencies",
                column: "PolicyCode");

            migrationBuilder.CreateIndex(
                name: "IX_Policies_ChapterId",
                table: "Policies",
                column: "ChapterId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Dependencies");

            migrationBuilder.DropTable(
                name: "DependencyTypes");

            migrationBuilder.DropTable(
                name: "Policies");

            migrationBuilder.DropTable(
                name: "Chapters");
        }
    }
}
