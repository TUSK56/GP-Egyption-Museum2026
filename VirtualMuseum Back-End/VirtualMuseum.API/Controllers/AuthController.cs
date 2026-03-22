using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
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
    [ProducesResponseType(typeof(ApiResponse), 403)]
    public async Task<IActionResult> Login([FromBody] LoginRequest? request, CancellationToken cancellationToken)
    {
        if (request == null)
        {
            _logger.LogWarning("Login attempted with null request");
            return BadRequest(new ApiResponse(false, "Invalid request body"));
        }

        var outcome = await _authService.LoginAsync(request.Email ?? string.Empty, request.Password ?? string.Empty, cancellationToken);

        if (outcome.Failure == LoginFailureKind.EmailNotConfirmed)
        {
            _logger.LogWarning("Login blocked - email not verified: {Email}", request.Email);
            return StatusCode(StatusCodes.Status403Forbidden,
                new ApiResponse(false, "Email not verified. Call POST /api/auth/send-otp then POST /api/auth/verify-otp, then try again."));
        }

        if (outcome.Failure == LoginFailureKind.AccountDisabled)
        {
            _logger.LogWarning("Login blocked - account inactive: {Email}", request.Email);
            return StatusCode(StatusCodes.Status403Forbidden, new ApiResponse(false, "This account is disabled."));
        }

        if (outcome.Result == null)
        {
            _logger.LogWarning("Login failed for email: {Email}", request.Email);
            return Unauthorized(new ApiResponse(false, "Invalid email or password"));
        }

        return Ok(new ApiResponse<LoginResponse>(true, new LoginResponse(
            outcome.Result.AccessToken, outcome.Result.RefreshToken, outcome.Result.UserId, outcome.Result.Email, outcome.Result.FullName, outcome.Result.Role)));
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
    /// Send email OTP for verification (5 minutes expiry).
    /// </summary>
    [HttpPost("send-otp")]
    [ProducesResponseType(typeof(ApiResponse), 200)]
    public async Task<IActionResult> SendOtp([FromBody] SendOtpRequest? request, CancellationToken cancellationToken)
    {
        if (request == null)
            return BadRequest(new ApiResponse(false, "Invalid request body"));

        var code = await _authService.SendOtpAsync(request.Email, cancellationToken);
        if (code == null)
            return BadRequest(new ApiResponse(false, "Invalid email"));

        // If SMTP sending is disabled (development), return the OTP code in response data for easy testing.
        var smtpEnabled = bool.TryParse(HttpContext.RequestServices.GetService<IConfiguration>()?
            .GetSection("Smtp")["Enabled"], out var enabled) && enabled;

        if (!smtpEnabled)
            return Ok(new ApiResponse<object>(true, new { code }, "OTP generated (SMTP disabled)"));

        return Ok(new ApiResponse(true, "OTP has been sent"));
    }

    /// <summary>
    /// Verify email OTP and mark user EmailConfirmed.
    /// </summary>
    [HttpPost("verify-otp")]
    [ProducesResponseType(typeof(ApiResponse), 200)]
    [ProducesResponseType(typeof(ApiResponse), 400)]
    public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpRequest? request, CancellationToken cancellationToken)
    {
        if (request == null)
            return BadRequest(new ApiResponse(false, "Invalid request body"));

        var ok = await _authService.VerifyOtpAsync(request.Email, request.Code, cancellationToken);
        if (!ok)
            return BadRequest(new ApiResponse(false, "Invalid or expired OTP"));

        return Ok(new ApiResponse(true, "Email verified successfully"));
    }

    /// <summary>
    /// Request a password reset code (email must be registered). Response is generic for security.
    /// </summary>
    [HttpPost("forgot-password/request")]
    [ProducesResponseType(typeof(ApiResponse), 200)]
    [ProducesResponseType(typeof(ApiResponse), 400)]
    public async Task<IActionResult> ForgotPasswordRequest([FromBody] ForgotPasswordRequestDto? request, CancellationToken cancellationToken)
    {
        if (request == null)
            return BadRequest(new ApiResponse(false, "Invalid request body"));

        await _authService.RequestPasswordResetAsync(request.Email, cancellationToken);
        return Ok(new ApiResponse(true, "If an account exists for this email, a reset code has been sent."));
    }

    /// <summary>
    /// Reset password using the code from forgot-password/request.
    /// </summary>
    [HttpPost("forgot-password/reset")]
    [ProducesResponseType(typeof(ApiResponse), 200)]
    [ProducesResponseType(typeof(ApiResponse), 400)]
    public async Task<IActionResult> ForgotPasswordReset([FromBody] ForgotPasswordResetRequest? request, CancellationToken cancellationToken)
    {
        if (request == null)
            return BadRequest(new ApiResponse(false, "Invalid request body"));
        if (request.NewPassword != request.ConfirmPassword)
            return BadRequest(new ApiResponse(false, "Passwords do not match"));

        var ok = await _authService.ResetPasswordWithOtpAsync(request.Email, request.OtpCode, request.NewPassword, cancellationToken);
        if (!ok)
            return BadRequest(new ApiResponse(false, "Invalid or expired code, or password does not meet requirements"));

        return Ok(new ApiResponse(true, "Password has been reset. You can sign in with your new password."));
    }

    /// <summary>
    /// Exchange a refresh token for a new access + refresh token pair.
    /// </summary>
    [HttpPost("refresh-token")]
    [ProducesResponseType(typeof(ApiResponse<LoginResponse>), 200)]
    [ProducesResponseType(typeof(ApiResponse), 400)]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest? request, CancellationToken cancellationToken)
    {
        if (request == null)
            return BadRequest(new ApiResponse(false, "Invalid request body"));

        var result = await _authService.RefreshTokenAsync(request.RefreshToken, cancellationToken);
        if (result == null)
            return BadRequest(new ApiResponse(false, "Invalid or expired refresh token"));

        return Ok(new ApiResponse<LoginResponse>(true, new LoginResponse(
            result.AccessToken, result.RefreshToken, result.UserId, result.Email, result.FullName, result.Role)));
    }

    /// <summary>
    /// Login using Google ID token.
    /// </summary>
    [HttpPost("google-login")]
    [ProducesResponseType(typeof(ApiResponse<LoginResponse>), 200)]
    [ProducesResponseType(typeof(ApiResponse), 400)]
    public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequest? request, CancellationToken cancellationToken)
    {
        if (request == null)
            return BadRequest(new ApiResponse(false, "Invalid request body"));

        var result = await _authService.GoogleLoginAsync(request.IdToken, cancellationToken);
        if (result == null)
            return BadRequest(new ApiResponse(false, "Invalid Google token"));

        return Ok(new ApiResponse<LoginResponse>(true, new LoginResponse(
            result.AccessToken, result.RefreshToken, result.UserId, result.Email, result.FullName, result.Role)));
    }
}
