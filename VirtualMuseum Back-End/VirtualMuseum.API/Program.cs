using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using VirtualMuseum.API.Middleware;
using VirtualMuseum.Application.Interfaces;
using VirtualMuseum.Application.Services;
using VirtualMuseum.Infrastructure.Data;
using VirtualMuseum.Infrastructure.Repositories;
using VirtualMuseum.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// Database - Scoped lifetime (default for AddDbContext)
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("Connection string 'DefaultConnection' is not configured in appsettings.json");
}

builder.Services.AddDbContext<MuseumDbContext>(options =>
{
    options.UseSqlServer(connectionString);
});

// Repositories
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<IArtifactRepository, ArtifactRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<IOtpRepository, OtpRepository>();
builder.Services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();

// Services
builder.Services.AddScoped<TokenService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<ArtifactService>();
builder.Services.AddScoped<EraService>();
builder.Services.AddScoped<CategoryService>();
builder.Services.AddScoped<MaterialService>();
builder.Services.AddScoped<TagService>();
builder.Services.AddScoped<UserService>();

// JWT Authentication
var jwtKey = builder.Configuration["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key is not configured in appsettings.json");
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        // Map JWT "role" claim to ClaimTypes.Role so [Authorize(Roles = "Admin")] works reliably.
        options.MapInboundClaims = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
            RoleClaimType = ClaimTypes.Role,
            NameClaimType = ClaimTypes.NameIdentifier
        };
    });

builder.Services.AddAuthorization();

var corsOrigins = builder.Configuration.GetSection("Cors:Origins").Get<string[]>() ?? Array.Empty<string>();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        if (corsOrigins.Length > 0)
            policy.WithOrigins(corsOrigins).AllowAnyHeader().AllowAnyMethod();
        else
            policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
    });
});

// Controllers with validation
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "3D Virtual Museum API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header. Example: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();

// Global exception handling - must be first
app.UseMiddleware<ExceptionHandlingMiddleware>();

// Database connection validation and migration
using (var scope = app.Services.CreateScope())
{
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    try
    {
        var context = scope.ServiceProvider.GetRequiredService<MuseumDbContext>();
        logger.LogInformation("Attempting database connection...");

        if (await context.Database.CanConnectAsync())
        {
            logger.LogInformation("Database connection successful. Applying migrations...");
            context.Database.Migrate();
            await DatabaseSeeder.SeedAsync(context);
            logger.LogInformation("Database migrations and seeding completed successfully.");
        }
        else
        {
            logger.LogError("Database connection failed. Please verify SQL Server is running and connection string in appsettings.json");
            throw new InvalidOperationException("Unable to connect to database.");
        }
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Database initialization failed: {Message}. Verify connection string: Server=...;Database=VirtualMuseumDB;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true;", ex.Message);
        throw;
    }
}

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "3D Virtual Museum API v1");
});

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();

// Required for integration tests
public partial class Program { }
