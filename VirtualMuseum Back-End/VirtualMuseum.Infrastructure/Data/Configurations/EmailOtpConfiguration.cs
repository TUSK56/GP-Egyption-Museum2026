using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using VirtualMuseum.Domain.Entities;

namespace VirtualMuseum.Infrastructure.Data.Configurations;

public class EmailOtpConfiguration : IEntityTypeConfiguration<EmailOtp>
{
    public void Configure(EntityTypeBuilder<EmailOtp> builder)
    {
        builder.ToTable("EmailOtps");
        builder.HasKey(e => e.Id);

        builder.Property(e => e.Email)
            .IsRequired()
            .HasMaxLength(256);

        builder.Property(e => e.Code)
            .IsRequired()
            .HasMaxLength(16);

        builder.Property(e => e.CreatedAt)
            .IsRequired();

        builder.Property(e => e.ExpirationTime)
            .IsRequired();
    }
}

