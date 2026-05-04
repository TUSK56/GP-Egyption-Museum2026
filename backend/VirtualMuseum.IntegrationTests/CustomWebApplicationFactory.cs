using Microsoft.AspNetCore.Mvc.Testing;

namespace VirtualMuseum.IntegrationTests;

/// <summary>
/// Uses real SQL Server from appsettings.json. Stop any running API instance before: dotnet test
/// </summary>
public class CustomWebApplicationFactory : WebApplicationFactory<Program>
{
}
