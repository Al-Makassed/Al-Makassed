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
    [Migration("20231018220118_Migrate Last Updates To Production")]
    partial class MigrateLastUpdatesToProduction
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

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

            modelBuilder.Entity("Makassed.Api.Models.Domain.Dependency", b =>
                {
                    b.HasOne("Makassed.Api.Models.Domain.Policy", "Policy")
                        .WithMany("Dependencies")
                        .HasForeignKey("PolicyCode")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Policy");
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

            modelBuilder.Entity("Makassed.Api.Models.Domain.Policy", b =>
                {
                    b.Navigation("Dependencies");
                });
#pragma warning restore 612, 618
        }
    }
}