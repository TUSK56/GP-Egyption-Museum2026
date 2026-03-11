using Microsoft.AspNetCore.Mvc;
using VirtualMuseum.API.DTOs;
using VirtualMuseum.Application.Interfaces;

namespace VirtualMuseum.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly ILogger<AuthController> _logger;

    public AuthController(IAuthService authService, ILogger<AuthController> logger)
    {
        _authService = authService;
        _logger = logger;
    }

    /// <summary>
    /// Login with email and password (for both users and admins).
    /// </summary>
    [HttpPost("login")]
    [ProducesResponseType(typeof(ApiResponse<LoginResponse>), 200)]
    [ProducesResponseType(typeof(ApiResponse), 400)]
    [ProducesResponseType(typeof(ApiResponse), 401)]
    public async Task<IActionResult> Login([FromBody] LoginRequest? request, CancellationToken cancellationToken)
    {
        if (request == null)
        {
            _logger.LogWarning("Login attempted with null request");
            return BadRequest(new ApiResponse(false, "Invalid request body"));
        }

        var result = await _authService.LoginAsync(request.Email ?? string.Empty, request.Password ?? string.Empty, cancellationToken);

        if (result == null)
        {
            _logger.LogWarning("Login failed for email: {Email}", request.Email);
            return Unauthorized(new ApiResponse(false, "Invalid email or password"));
        }

        return Ok(new ApiResponse<LoginResponse>(true, new LoginResponse(
            result.Token, result.UserId, result.Email, result.FullName, result.Role)));
    }

    /// <summary>
    /// Register a new user account (name, email, region, password).
    /// </summary>
    [HttpPost("register")]
    [ProducesResponseType(typeof(ApiResponse<RegisterResponse>), 201)]
    [ProducesResponseType(typeof(ApiResponse), 400)]
    public async Task<IActionResult> Register([FromBody] RegisterRequest? request, CancellationToken cancellationToken)
    {
        if (request == null)
        {
            _logger.LogWarning("Register attempted with null request");
            return BadRequest(new ApiResponse(false, "Invalid request body"));
        }

        var result = await _authService.RegisterAsync(
            request.FullName ?? string.Empty,
            request.Email ?? string.Empty,
            request.Region ?? string.Empty,
            request.Password ?? string.Empty,
            cancellationToken);

        if (result == null)
        {
            _logger.LogWarning("Register failed - email already exists: {Email}", request.Email);
            return BadRequest(new ApiResponse(false, "Email already registered"));
        }

        return Created("api/auth/register", new ApiResponse<RegisterResponse>(true, new RegisterResponse(
            result.UserId, result.Email, result.FullName, result.Region)));
    }

    /// <summary>
    /// Step 1 of forgot password: submit email. In development, OTP is always 0000.
    /// </summary>
    [HttpPost("forgot-password/request")]
    [ProducesResponseType(typeof(ApiResponse), 200)]
    public async Task<IActionResult> ForgotPasswordRequest([FromBody] ForgotPasswordRequestDto? request, CancellationToken cancellationToken)
    {
        if (request == null)
            return BadRequest(new ApiResponse(false, "Invalid request body"));
        var found = await _authService.ForgotPasswordRequestAsync(request.Email ?? string.Empty, cancellationToken);
        return Ok(new ApiResponse(true, found
            ? "If the email exists, an OTP has been sent. In development, use OTP: 0000"
            : "If the email exists, an OTP has been sent. In development, use OTP: 0000"));
    }

    /// <summary>
    /// Step 2 of forgot password: submit email, OTP (0000 in dev), new password, and confirm password.
    /// </summary>
    [HttpPost("forgot-password/reset")]
    [ProducesResponseType(typeof(ApiResponse), 200)]
    [ProducesResponseType(typeof(ApiResponse), 400)]
    public async Task<IActionResult> ForgotPasswordReset([FromBody] ForgotPasswordResetRequest? request, CancellationToken cancellationToken)
    {
        if (request == null)
            return BadRequest(new ApiResponse(false, "Invalid request body"));
        var success = await _authService.ForgotPasswordResetAsync(
            request.Email ?? string.Empty,
            request.OtpCode ?? string.Empty,
            request.NewPassword ?? string.Empty,
            request.ConfirmPassword ?? string.Empty,
            cancellationToken);

        if (!success)
            return BadRequest(new ApiResponse(false, "Invalid OTP, email not found, or passwords do not match"));

        return Ok(new ApiResponse(true, "Password has been reset successfully"));
    }
}
