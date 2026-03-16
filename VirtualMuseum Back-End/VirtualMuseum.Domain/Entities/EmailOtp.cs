namespace VirtualMuseum.Domain.Entities;

public class EmailOtp
{
    public Guid Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public DateTime ExpirationTime { get; set; }
    public bool IsUsed { get; set; }
    public DateTime CreatedAt { get; set; }
}

