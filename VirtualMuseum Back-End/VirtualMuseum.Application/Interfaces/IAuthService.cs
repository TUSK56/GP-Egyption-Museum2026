namespace VirtualMuseum.Application.Interfaces;

public interface IAuthService
{
    Task<AuthResult?> LoginAsync(string email, string password, CancellationToken cancellationToken = default);
    Task<RegisterResult?> RegisterAsync(string fullName, string email, string region, string password, CancellationToken cancellationToken = default);
    Task<string?> SendOtpAsync(string email, CancellationToken cancellationToken = default);
    Task<bool> VerifyOtpAsync(string email, string code, CancellationToken cancellationToken = default);
    Task<AuthResult?> RefreshTokenAsync(string refreshToken, CancellationToken cancellationToken = default);
    Task<AuthResult?> GoogleLoginAsync(string idToken, CancellationToken cancellationToken = default);
}

public record AuthResult(string AccessToken, string RefreshToken, Guid UserId, string Email, string FullName, string Role);

public record RegisterResult(Guid UserId, string Email, string FullName, string Region);
