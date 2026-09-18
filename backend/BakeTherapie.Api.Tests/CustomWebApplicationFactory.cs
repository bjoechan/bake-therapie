using BakeTherapie.Api.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace BakeTherapie.Api.Tests;

// Boots the real ASP.NET pipeline (routing, model binding, JSON serialization) against an
// InMemory database instead of SQL Server, so tests can catch wire-format issues (casing,
// enum encoding) that calling controllers directly would miss.
public class CustomWebApplicationFactory : WebApplicationFactory<Program>
{
    public string DatabaseName { get; } = Guid.NewGuid().ToString();

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            services.RemoveAll<DbContextOptions<AppDbContext>>();

            // Isolated so InMemory's provider services don't collide with the SQL Server
            // provider services Program.cs already registered in the same IServiceCollection.
            var inMemoryServiceProvider = new ServiceCollection()
                .AddEntityFrameworkInMemoryDatabase()
                .BuildServiceProvider();

            services.AddDbContext<AppDbContext>(options =>
            {
                options.UseInMemoryDatabase(DatabaseName);
                options.UseInternalServiceProvider(inMemoryServiceProvider);
            });
        });
    }
}
