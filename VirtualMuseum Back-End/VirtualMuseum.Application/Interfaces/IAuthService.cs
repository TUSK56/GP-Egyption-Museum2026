namespace VirtualMuseum.Application.Interfaces;

public interface IAuthService
{
    Task<AuthResult?> LoginAsync(string email, string password, CancellationToken cancellationToken = default);
    Task<RegisterResult?> RegisterAsync(string fullName, string email, string region, string password, CancellationToken cancellationToken = default);
    Task<bool> ForgotPasswordRequestAsync(string email, CancellationToken cancellationToken = default);
    Task<bool> ForgotPasswordResetAsync(string email, string otpCode, string newPassword, string confirmPassword, CancellationToken cancellationToken = default);
}

public record AuthResult(string Token, Guid UserId, string Email, string FullName, string Role);

public record RegisterResult(Guid UserId, string Email, string FullName, string Region);
