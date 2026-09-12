using BakeTherapie.Api.Data;
using BakeTherapie.Api.DTOs;
using BakeTherapie.Api.Models;
using BakeTherapie.Api.Models.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BakeTherapie.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController(AppDbContext db) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<OrderDto>> CreateOrder(CreateOrderRequest request)
    {
        if (request.FulfillmentType == FulfillmentType.Pickup && string.IsNullOrWhiteSpace(request.PickupLocation))
        {
            return ValidationProblem("PickupLocation is required when FulfillmentType is Pickup.");
        }

        var productIds = request.Items.Select(i => i.ProductId).Distinct().ToList();
        var products = await db.Products
            .Where(p => productIds.Contains(p.Id))
            .ToDictionaryAsync(p => p.Id);

        var missingIds = productIds.Where(id => !products.ContainsKey(id)).ToList();
        if (missingIds.Count > 0)
        {
            return ValidationProblem($"Unknown ProductId(s): {string.Join(", ", missingIds)}.");
        }

        var unavailable = productIds.Where(id => !products[id].IsAvailable).ToList();
        if (unavailable.Count > 0)
        {
            return ValidationProblem($"Product(s) not available: {string.Join(", ", unavailable)}.");
        }

        var order = new Order
        {
            CustomerName = request.CustomerName,
            CustomerPhone = request.CustomerPhone,
            CustomerEmail = request.CustomerEmail,
            MarketingOptIn = request.MarketingOptIn,
            FulfillmentType = request.FulfillmentType,
            PickupLocation = request.FulfillmentType == FulfillmentType.Pickup ? request.PickupLocation : null,
            TransactionLocation = request.TransactionLocation,
            Status = OrderStatus.New,
            PaymentStatus = PaymentStatus.Unpaid,
        };

        foreach (var itemRequest in request.Items)
        {
            var product = products[itemRequest.ProductId];
            order.Items.Add(new OrderItem
            {
                ProductId = product.Id,
                ProductNameSnapshot = product.Name,
                UnitPriceSnapshot = product.Price,
                Quantity = itemRequest.Quantity,
            });
        }

        db.Orders.Add(order);
        await db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, OrderDto.FromEntity(order));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<OrderDto>> GetOrder(int id)
    {
        var order = await db.Orders
            .Include(o => o.Items)
            .FirstOrDefaultAsync(o => o.Id == id);

        return order is null ? NotFound() : Ok(OrderDto.FromEntity(order));
    }

    private ActionResult ValidationProblem(string detail) =>
        base.ValidationProblem(new ValidationProblemDetails(new Dictionary<string, string[]>
        {
            ["request"] = [detail],
        }));
}
