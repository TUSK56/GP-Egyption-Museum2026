using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using VirtualMuseum.Application.Interfaces;
using VirtualMuseum.Domain.Entities;

namespace VirtualMuseum.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IRoleRepository _roleRepository;
    private readonly IConfiguration _configuration;

    public AuthService(IUserRepository userRepository, IRoleRepository roleRepository, IConfiguration configuration)
    {
        _userRepository = userRepository;
        _roleRepository = roleRepository;
        _configuration = configuration;
    }

    public async Task<AuthResult?> LoginAsync(string email, string password, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
            return null;

        var user = await _userRepository.GetByEmailAsync(email, cancellationToken);
        if (user == null || !user.IsActive)
            return null;

        try
        {
            if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash ?? string.Empty))
                return null;
        }
        catch
        {
            return null;
        }

        var token = GenerateJwtToken(user);
        return new AuthResult(token, user.Id, user.Email, user.FullName, user.Role?.Name ?? "User");
    }

    public async Task<RegisterResult?> RegisterAsync(string fullName, string email, string region, string password, CancellationToken cancellationToken = default)
    {
        var existing = await _userRepository.GetByEmailAsync(email, cancellationToken);
        if (existing != null)
            return null;

        var userRole = await _roleRepository.GetByNameAsync("User", cancellationToken);
        if (userRole == null)
            return null;

        var user = new User
        {
            Id = Guid.NewGuid(),
            FullName = fullName,
            Email = email,
            Region = region,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
            RoleId = userRole.Id,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        await _userRepository.AddAsync(user, cancellationToken);
        return new RegisterResult(user.Id, user.Email, user.FullName, user.Region);
    }

    public async Task<bool> ForgotPasswordRequestAsync(string email, CancellationToken cancellationToken = default)
    {
        var user = await _userRepository.GetByEmailAsync(email, cancellationToken);
        return user != null; // In dev, we don't send real email; OTP is always 0000
    }

    public async Task<bool> ForgotPasswordResetAsync(string email, string otpCode, string newPassword, string confirmPassword, CancellationToken cancellationToken = default)
    {
        if (otpCode != "0000")
            return false;
        if (string.IsNullOrWhiteSpace(newPassword) || newPassword != confirmPassword)
            return false;

        var user = await _userRepository.GetByEmailAsync(email, cancellationToken);
        if (user == null)
            return false;

        user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);
        await _userRepository.UpdateAsync(user, cancellationToken);
        return true;
    }

    private string GenerateJwtToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            _configuration["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key is not configured")));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role.Name),
            new Claim("FullName", user.FullName)
        };

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(24),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
