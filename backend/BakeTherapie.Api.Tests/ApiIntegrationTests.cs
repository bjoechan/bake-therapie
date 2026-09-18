using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using BakeTherapie.Api.Data;
using BakeTherapie.Api.Models;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace BakeTherapie.Api.Tests;

// Exercises the real HTTP/JSON pipeline end to end, since the frontend depends on details
// (camelCase property names, enums encoded as ints) that controller-level unit tests bypass.
// Each test gets its own factory (and therefore its own InMemory database) to avoid cross-test data leakage.
public class ApiIntegrationTests
{
    [Fact]
    public async Task GetProducts_SerializesWithCamelCasePropertyNames()
    {
        await using var factory = new CustomWebApplicationFactory();
        using var scope = factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        db.Products.Add(new Product { Name = "Test Cookie", ImageUrl = "/images/test.png", Price = 4.5m, IsAvailable = true });
        await db.SaveChangesAsync();

        var client = factory.CreateClient();
        var response = await client.GetAsync("/api/products");
        response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadFromJsonAsync<JsonElement>();
        var product = json[0];
        Assert.Equal("Test Cookie", product.GetProperty("name").GetString());
        Assert.Equal("/images/test.png", product.GetProperty("imageUrl").GetString());
        Assert.Equal(4.5m, product.GetProperty("price").GetDecimal());
    }

    [Fact]
    public async Task CreateOrder_AcceptsIntegerFulfillmentTypeAndReturnsCamelCaseOrder()
    {
        await using var factory = new CustomWebApplicationFactory();
        using var scope = factory.Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        db.Products.Add(new Product { Id = 1, Name = "Test Cookie", Price = 4.5m, IsAvailable = true });
        await db.SaveChangesAsync();

        var client = factory.CreateClient();
        var response = await client.PostAsJsonAsync("/api/orders", new
        {
            customerName = "Jamie Doe",
            customerPhone = "555-0100",
            customerEmail = "jamie@example.com",
            marketingOptIn = false,
            fulfillmentType = 0, // Pickup
            pickupLocation = "Farmers Market - Downtown",
            transactionLocation = "Farmers Market - Downtown",
            items = new[] { new { productId = 1, quantity = 2 } },
        });

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        var json = await response.Content.ReadFromJsonAsync<JsonElement>();
        Assert.Equal("Jamie Doe", json.GetProperty("customerName").GetString());
        Assert.Equal(9.0m, json.GetProperty("total").GetDecimal());
        Assert.Equal(0, json.GetProperty("fulfillmentType").GetInt32());
    }
}
