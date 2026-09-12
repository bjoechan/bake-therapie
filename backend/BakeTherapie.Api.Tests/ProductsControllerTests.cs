using BakeTherapie.Api.Controllers;
using BakeTherapie.Api.DTOs;
using BakeTherapie.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace BakeTherapie.Api.Tests;

public class ProductsControllerTests
{
    [Fact]
    public async Task GetProducts_ReturnsOnlyAvailableProducts_OrderedByDisplayOrder()
    {
        await using var db = TestDbContextFactory.Create();
        db.Products.AddRange(
            new Product { Name = "Later", Price = 3, IsAvailable = true, DisplayOrder = 2 },
            new Product { Name = "Hidden", Price = 4, IsAvailable = false, DisplayOrder = 0 },
            new Product { Name = "First", Price = 5, IsAvailable = true, DisplayOrder = 1 });
        await db.SaveChangesAsync();

        var controller = new ProductsController(db);

        var result = await controller.GetProducts();

        var ok = Assert.IsType<OkObjectResult>(result.Result);
        var products = Assert.IsAssignableFrom<IEnumerable<ProductDto>>(ok.Value).ToList();
        Assert.Equal(["First", "Later"], products.Select(p => p.Name));
    }
}
