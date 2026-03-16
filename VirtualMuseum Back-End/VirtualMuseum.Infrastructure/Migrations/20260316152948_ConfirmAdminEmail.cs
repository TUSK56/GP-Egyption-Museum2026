using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VirtualMuseum.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ConfirmAdminEmail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                "UPDATE [Users] SET [EmailConfirmed] = 1 WHERE [Email] = 'admin@museum.com';");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                "UPDATE [Users] SET [EmailConfirmed] = 0 WHERE [Email] = 'admin@museum.com';");
        }
    }
}
