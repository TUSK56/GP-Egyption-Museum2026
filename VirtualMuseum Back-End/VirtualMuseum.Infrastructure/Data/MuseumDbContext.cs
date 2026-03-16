using Microsoft.EntityFrameworkCore;
using VirtualMuseum.Domain.Entities;

namespace VirtualMuseum.Infrastructure.Data;

public class MuseumDbContext : DbContext
{
    public MuseumDbContext(DbContextOptions<MuseumDbContext> options)
        : base(options)
    {
    }

    public DbSet<Role> Roles => Set<Role>();
    public DbSet<User> Users => Set<User>();
    public DbSet<MuseumFile> Files => Set<MuseumFile>();
    public DbSet<Era> Eras => Set<Era>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Material> Materials => Set<Material>();
    public DbSet<DiscoveryLocation> DiscoveryLocations => Set<DiscoveryLocation>();
    public DbSet<Artifact> Artifacts => Set<Artifact>();
    public DbSet<ArtifactTranslation> ArtifactTranslations => Set<ArtifactTranslation>();
    public DbSet<ArtifactMedia> ArtifactMedia => Set<ArtifactMedia>();
    public DbSet<Tag> Tags => Set<Tag>();
    public DbSet<ArtifactTag> ArtifactTags => Set<ArtifactTag>();
    public DbSet<ArtifactEmbedding> ArtifactEmbeddings => Set<ArtifactEmbedding>();
    public DbSet<ChatSession> ChatSessions => Set<ChatSession>();
    public DbSet<ChatMessage> ChatMessages => Set<ChatMessage>();
    public DbSet<ChatMessageArtifact> ChatMessageArtifacts => Set<ChatMessageArtifact>();
    public DbSet<Favorite> Favorites => Set<Favorite>();
    public DbSet<Review> Reviews => Set<Review>();
    public DbSet<ArtifactView> ArtifactViews => Set<ArtifactView>();
    public DbSet<EmailOtp> EmailOtps => Set<EmailOtp>();
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(MuseumDbContext).Assembly);
    }
}
