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
                """
                IF COL_LENGTH('Users', 'Email') IS NOT NULL
                    EXEC(N'UPDATE [Users] SET [EmailConfirmed] = 1 WHERE [Email] = N''admin@museum.com'';');
                ELSE IF COL_LENGTH('Users', 'EmailAddress') IS NOT NULL
                    EXEC(N'UPDATE [Users] SET [EmailConfirmed] = 1 WHERE [EmailAddress] = N''admin@museum.com'';');
                """);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                """
                IF COL_LENGTH('Users', 'Email') IS NOT NULL
                    EXEC(N'UPDATE [Users] SET [EmailConfirmed] = 0 WHERE [Email] = N''admin@museum.com'';');
                ELSE IF COL_LENGTH('Users', 'EmailAddress') IS NOT NULL
                    EXEC(N'UPDATE [Users] SET [EmailConfirmed] = 0 WHERE [EmailAddress] = N''admin@museum.com'';');
                """);
        }
    }
}
