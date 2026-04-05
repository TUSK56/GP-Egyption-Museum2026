using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VirtualMuseum.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class EmailOtpUserIdFk : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "EmailOtps",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.Sql("""
                UPDATE eo
                SET eo.UserId = u.Id
                FROM EmailOtps AS eo
                INNER JOIN Users AS u ON u.Email = eo.Email
                """);

            migrationBuilder.Sql("DELETE FROM EmailOtps WHERE UserId IS NULL");

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "EmailOtps",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.DropColumn(
                name: "Email",
                table: "EmailOtps");

            migrationBuilder.CreateIndex(
                name: "IX_EmailOtps_UserId",
                table: "EmailOtps",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmailOtps_Users_UserId",
                table: "EmailOtps",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmailOtps_Users_UserId",
                table: "EmailOtps");

            migrationBuilder.DropIndex(
                name: "IX_EmailOtps_UserId",
                table: "EmailOtps");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "EmailOtps",
                type: "nvarchar(256)",
                maxLength: 256,
                nullable: false,
                defaultValue: "");

            migrationBuilder.Sql("""
                UPDATE eo
                SET eo.Email = u.Email
                FROM EmailOtps AS eo
                INNER JOIN Users AS u ON u.Id = eo.UserId
                """);

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "EmailOtps");
        }
    }
}
