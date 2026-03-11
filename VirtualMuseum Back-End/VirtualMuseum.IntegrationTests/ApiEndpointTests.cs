using System.Net;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

namespace VirtualMuseum.IntegrationTests;

public class ApiEndpointTests : IClassFixture<CustomWebApplicationFactory>
{
    private readonly HttpClient _client;
    private readonly JsonSerializerOptions _jsonOptions = new() { PropertyNameCaseInsensitive = true };

    public ApiEndpointTests(CustomWebApplicationFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task Auth_Login_WithValidCredentials_Returns200()
    {
        var response = await _client.PostAsJsonAsync("/api/auth/login", new { email = "admin@museum.com", password = "admin@123" });
        Assert.True(response.IsSuccessStatusCode, $"Expected 200, got {(int)response.StatusCode}");
        var json = await response.Content.ReadAsStringAsync();
        Assert.Contains("success", json);
    }

    [Fact]
    public async Task Auth_Login_WithInvalidCredentials_Returns401()
    {
        var response = await _client.PostAsJsonAsync("/api/auth/login", new { email = "invalid@test.com", password = "wrong" });
        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task Auth_Login_WithNullBody_Returns400()
    {
        var response = await _client.PostAsync("/api/auth/login", new StringContent("", Encoding.UTF8, "application/json"));
        Assert.True(response.StatusCode == HttpStatusCode.BadRequest || response.StatusCode == HttpStatusCode.UnsupportedMediaType);
    }

    [Fact]
    public async Task Auth_Register_WithValidData_Returns201()
    {
        var uniqueEmail = $"user{Guid.NewGuid():N}@test.com";
        var response = await _client.PostAsJsonAsync("/api/auth/register", new
        {
            fullName = "Test User",
            email = uniqueEmail,
            region = "Test Region",
            password = "Test@123"
        });
        Assert.True(response.IsSuccessStatusCode, $"Expected 2xx, got {(int)response.StatusCode}");
    }

    [Fact]
    public async Task Auth_Register_WithDuplicateEmail_Returns400()
    {
        var response = await _client.PostAsJsonAsync("/api/auth/register", new
        {
            fullName = "Test",
            email = "admin@museum.com",
            region = "Test",
            password = "Test@123"
        });
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task Artifacts_GetAll_Returns200()
    {
        var response = await _client.GetAsync("/api/artifacts");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        AssertNever500(response);
    }

    [Fact]
    public async Task Categories_GetAll_Returns200()
    {
        var response = await _client.GetAsync("/api/categories");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        AssertNever500(response);
    }

    [Fact]
    public async Task Eras_GetAll_Returns200()
    {
        var response = await _client.GetAsync("/api/eras");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        AssertNever500(response);
    }

    [Fact]
    public async Task Materials_GetAll_Returns200()
    {
        var response = await _client.GetAsync("/api/materials");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        AssertNever500(response);
    }

    [Fact]
    public async Task Tags_GetAll_Returns200()
    {
        var response = await _client.GetAsync("/api/tags");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        AssertNever500(response);
    }

    [Fact]
    public async Task Artifacts_GetById_WithInvalidId_Returns404()
    {
        var response = await _client.GetAsync("/api/artifacts/00000000-0000-0000-0000-000000000000");
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        AssertNever500(response);
    }

    [Fact]
    public async Task Swagger_Loads_Returns200()
    {
        var response = await _client.GetAsync("/swagger/v1/swagger.json");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        AssertNever500(response);
    }

    [Fact]
    public async Task Auth_ForgotPasswordRequest_Returns200()
    {
        var response = await _client.PostAsJsonAsync("/api/auth/forgot-password/request", new { email = "admin@museum.com" });
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        AssertNever500(response);
    }

    private static void AssertNever500(HttpResponseMessage response)
    {
        Assert.NotEqual(HttpStatusCode.InternalServerError, response.StatusCode);
    }
}
