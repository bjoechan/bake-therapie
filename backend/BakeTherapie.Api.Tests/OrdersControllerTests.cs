using BakeTherapie.Api.Controllers;
using BakeTherapie.Api.DTOs;
using BakeTherapie.Api.Models;
using BakeTherapie.Api.Models.Enums;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace BakeTherapie.Api.Tests;

public class OrdersControllerTests
{
    private static CreateOrderRequest ValidRequest(int productId) => new(
        CustomerName: "Jamie Doe",
        CustomerPhone: "555-0100",
        CustomerEmail: "jamie@example.com",
        MarketingOptIn: false,
        FulfillmentType: FulfillmentType.Pickup,
        PickupLocation: "Farmers Market - Downtown",
        TransactionLocation: "Farmers Market - Downtown",
        Items: [new CreateOrderItemRequest(productId, 2)]);

    [Fact]
    public async Task CreateOrder_WithUnknownProductId_ReturnsValidationProblem()
    {
        await using var db = TestDbContextFactory.Create();
        var controller = new OrdersController(db);

        var result = await controller.CreateOrder(ValidRequest(productId: 999));

        var problem = Assert.IsAssignableFrom<ObjectResult>(result.Result);
        Assert.Equal(400, problem.StatusCode);
    }

    [Fact]
    public async Task CreateOrder_WithUnavailableProduct_ReturnsValidationProblem()
    {
        await using var db = TestDbContextFactory.Create();
        db.Products.Add(new Product { Id = 1, Name = "Retired Cookie", Price = 4, IsAvailable = false });
        await db.SaveChangesAsync();
        var controller = new OrdersController(db);

        var result = await controller.CreateOrder(ValidRequest(productId: 1));

        var problem = Assert.IsAssignableFrom<ObjectResult>(result.Result);
        Assert.Equal(400, problem.StatusCode);
    }

    [Fact]
    public async Task CreateOrder_PickupWithoutPickupLocation_ReturnsValidationProblem()
    {
        await using var db = TestDbContextFactory.Create();
        db.Products.Add(new Product { Id = 1, Name = "Cookie", Price = 4, IsAvailable = true });
        await db.SaveChangesAsync();
        var controller = new OrdersController(db);
        var request = ValidRequest(productId: 1) with { PickupLocation = null };

        var result = await controller.CreateOrder(request);

        var problem = Assert.IsAssignableFrom<ObjectResult>(result.Result);
        Assert.Equal(400, problem.StatusCode);
    }

    [Fact]
    public async Task CreateOrder_WithValidRequest_PersistsUnpaidNewOrderWithSnapshottedItems()
    {
        await using var db = TestDbContextFactory.Create();
        db.Products.Add(new Product { Id = 1, Name = "Ruth's Chocolate Chips", Price = 4.5m, IsAvailable = true });
        await db.SaveChangesAsync();
        var controller = new OrdersController(db);

        var result = await controller.CreateOrder(ValidRequest(productId: 1));

        var created = Assert.IsType<CreatedAtActionResult>(result.Result);
        var order = Assert.IsType<OrderDto>(created.Value);
        Assert.Equal(OrderStatus.New, order.Status);
        Assert.Equal(PaymentStatus.Unpaid, order.PaymentStatus);
        Assert.Equal(9.0m, order.Total);
        var item = Assert.Single(order.Items);
        Assert.Equal("Ruth's Chocolate Chips", item.ProductName);
        Assert.Equal(4.5m, item.UnitPrice);
        Assert.Equal(2, item.Quantity);
    }

    [Fact]
    public async Task GetOrder_WithUnknownId_ReturnsNotFound()
    {
        await using var db = TestDbContextFactory.Create();
        var controller = new OrdersController(db);

        var result = await controller.GetOrder(404);

        Assert.IsType<NotFoundResult>(result.Result);
    }
}
