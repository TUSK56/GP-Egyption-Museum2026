using Microsoft.EntityFrameworkCore;
using VirtualMuseum.Domain.Entities;
using VirtualMuseum.Infrastructure.Data;

namespace VirtualMuseum.Infrastructure.Data;

public static class DatabaseSeeder
{
    public static async Task SeedAsync(MuseumDbContext context)
    {
        if (await context.Roles.AnyAsync())
        {
            return; // Already seeded
        }

        // Roles
        var adminRole = new Role
        {
            Id = Guid.NewGuid(),
            Name = "Admin",
            CreatedAt = DateTime.UtcNow
        };
        var userRole = new Role
        {
            Id = Guid.NewGuid(),
            Name = "User",
            CreatedAt = DateTime.UtcNow
        };
        context.Roles.AddRange(adminRole, userRole);

        // Admin User - Password: admin@123 (BCrypt hashed)
        var adminUser = new User
        {
            Id = Guid.NewGuid(),
            FullName = "Administrator",
            Email = "admin@museum.com",
            Region = "System",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin@123"),
            RoleId = adminRole.Id,
            IsActive = true,
            CreatedAt = DateTime.UtcNow,
            EmailConfirmed = true
        };
        context.Users.Add(adminUser);
        await context.SaveChangesAsync();

        // Eras
        var era1 = new Era { Id = Guid.NewGuid(), Name = "Ancient Egypt", StartYear = -3100, EndYear = -30 };
        var era2 = new Era { Id = Guid.NewGuid(), Name = "Roman Empire", StartYear = -27, EndYear = 476 };
        var era3 = new Era { Id = Guid.NewGuid(), Name = "Renaissance", StartYear = 1300, EndYear = 1600 };
        context.Eras.AddRange(era1, era2, era3);

        // Categories
        var cat1 = new Category { Id = Guid.NewGuid(), Name = "Sculpture" };
        var cat2 = new Category { Id = Guid.NewGuid(), Name = "Pottery" };
        var cat3 = new Category { Id = Guid.NewGuid(), Name = "Jewelry" };
        context.Categories.AddRange(cat1, cat2, cat3);

        // Materials
        var mat1 = new Material { Id = Guid.NewGuid(), Name = "Stone" };
        var mat2 = new Material { Id = Guid.NewGuid(), Name = "Bronze" };
        var mat3 = new Material { Id = Guid.NewGuid(), Name = "Clay" };
        context.Materials.AddRange(mat1, mat2, mat3);

        await context.SaveChangesAsync();

        // Artifacts
        var artifact1 = new Artifact
        {
            Id = Guid.NewGuid(),
            Slug = "ancient-egyptian-bust",
            EraId = era1.Id,
            CategoryId = cat1.Id,
            MaterialId = mat1.Id,
            Height = 45,
            Width = 30,
            Depth = 25,
            Weight = 15,
            CreatedBy = adminUser.Id,
            CreatedAt = DateTime.UtcNow
        };
        var artifact2 = new Artifact
        {
            Id = Guid.NewGuid(),
            Slug = "roman-amphora",
            EraId = era2.Id,
            CategoryId = cat2.Id,
            MaterialId = mat3.Id,
            Height = 60,
            Width = 35,
            Depth = 35,
            Weight = 8,
            CreatedBy = adminUser.Id,
            CreatedAt = DateTime.UtcNow
        };
        var artifact3 = new Artifact
        {
            Id = Guid.NewGuid(),
            Slug = "renaissance-medal",
            EraId = era3.Id,
            CategoryId = cat3.Id,
            MaterialId = mat2.Id,
            Height = 5,
            Width = 5,
            Depth = 0.5m,
            Weight = 0.1m,
            CreatedBy = adminUser.Id,
            CreatedAt = DateTime.UtcNow
        };
        context.Artifacts.AddRange(artifact1, artifact2, artifact3);

        await context.SaveChangesAsync();
    }
}
