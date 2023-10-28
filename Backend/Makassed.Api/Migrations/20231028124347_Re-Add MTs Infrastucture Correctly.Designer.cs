﻿// <auto-generated />
using System;
using Makassed.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Makassed.Api.Migrations
{
    [DbContext(typeof(MakassedDbContext))]
    [Migration("20231028124347_Re-Add MTs Infrastucture Correctly")]
    partial class ReAddMTsInfrastuctureCorrectly
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.12")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("FieldMonitoringTool", b =>
                {
                    b.Property<Guid>("FieldsId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("MonitoringToolsId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("FieldsId", "MonitoringToolsId");

                    b.HasIndex("MonitoringToolsId");

                    b.ToTable("FieldMonitoringTool");
                });

            modelBuilder.Entity("Makassed.Api.Models.Domain.Chapter", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("EnableState")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Chapters");
                });

            modelBuilder.Entity("Makassed.Api.Models.Domain.Department", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Departments");
                });

            modelBuilder.Entity("Makassed.Api.Models.Domain.Dependency", b =>
                {
                    b.Property<string>("Code")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("EstimatedTimeInMin")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PagesCount")
                        .HasColumnType("int");

                    b.Property<string>("PdfUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PolicyCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("PolicyDependencyType")
                        .HasColumnType("int");

                    b.HasKey("Code");

                    b.HasIndex("PolicyCode");

                    b.ToTable("Dependencies");
                });

            modelBuilder.Entity("Makassed.Api.Models.Domain.Field", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Fields");
                });

            modelBuilder.Entity("Makassed.Api.Models.Domain.MonitoringTool", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("DepartmentId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("LastModified")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("DepartmentId");

                    b.ToTable("MonitoringTools");
                });

            modelBuilder.Entity("Makassed.Api.Models.Domain.Policy", b =>
                {
                    b.Property<string>("Code")
                        .HasColumnType("nvarchar(450)");

                    b.Property<Guid>("ChapterId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("EstimatedTimeInMin")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PageCount")
                        .HasColumnType("int");

                    b.Property<string>("PdfUrl")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Code");

                    b.HasIndex("ChapterId");

                    b.ToTable("Policies");
                });

            modelBuilder.Entity("FieldMonitoringTool", b =>
                {
                    b.HasOne("Makassed.Api.Models.Domain.Field", null)
                        .WithMany()
                        .HasForeignKey("FieldsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Makassed.Api.Models.Domain.MonitoringTool", null)
                        .WithMany()
                        .HasForeignKey("MonitoringToolsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Makassed.Api.Models.Domain.Dependency", b =>
                {
                    b.HasOne("Makassed.Api.Models.Domain.Policy", "Policy")
                        .WithMany("Dependencies")
                        .HasForeignKey("PolicyCode")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Policy");
                });

            modelBuilder.Entity("Makassed.Api.Models.Domain.MonitoringTool", b =>
                {
                    b.HasOne("Makassed.Api.Models.Domain.Department", null)
                        .WithMany("MonitoringTools")
                        .HasForeignKey("DepartmentId");
                });

            modelBuilder.Entity("Makassed.Api.Models.Domain.Policy", b =>
                {
                    b.HasOne("Makassed.Api.Models.Domain.Chapter", "Chapter")
                        .WithMany("Policies")
                        .HasForeignKey("ChapterId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Chapter");
                });

            modelBuilder.Entity("Makassed.Api.Models.Domain.Chapter", b =>
                {
                    b.Navigation("Policies");
                });

            modelBuilder.Entity("Makassed.Api.Models.Domain.Department", b =>
                {
                    b.Navigation("MonitoringTools");
                });

            modelBuilder.Entity("Makassed.Api.Models.Domain.Policy", b =>
                {
                    b.Navigation("Dependencies");
                });
#pragma warning restore 612, 618
        }
    }
}
