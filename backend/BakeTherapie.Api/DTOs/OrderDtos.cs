using System.ComponentModel.DataAnnotations;
using BakeTherapie.Api.Models;
using BakeTherapie.Api.Models.Enums;

namespace BakeTherapie.Api.DTOs;

// Validation attributes must target the primary constructor parameters directly (no
// `property:` specifier) — ASP.NET Core's model validation throws at request time otherwise,
// since it requires record validation metadata to live on the parameter, not the property.
public record CreateOrderItemRequest(
    [Required] int ProductId,
    [Range(1, 100)] int Quantity);

public record CreateOrderRequest(
    [Required, StringLength(200)] string CustomerName,
    [Required, StringLength(50)] string CustomerPhone,
    [Required, EmailAddress, StringLength(320)] string CustomerEmail,
    bool MarketingOptIn,
    [Required] FulfillmentType FulfillmentType,
    string? PickupLocation,
    [Required, StringLength(200)] string TransactionLocation,
    [Required, MinLength(1)] List<CreateOrderItemRequest> Items);

public record OrderItemDto(int ProductId, string ProductName, decimal UnitPrice, int Quantity)
{
    public static OrderItemDto FromEntity(OrderItem item) => new(
        item.ProductId, item.ProductNameSnapshot, item.UnitPriceSnapshot, item.Quantity);
}

public record OrderDto(
    int Id,
    string CustomerName,
    OrderStatus Status,
    PaymentStatus PaymentStatus,
    FulfillmentType FulfillmentType,
    string? PickupLocation,
    string TransactionLocation,
    DateTimeOffset CreatedAt,
    List<OrderItemDto> Items,
    decimal Total)
{
    public static OrderDto FromEntity(Order order) => new(
        order.Id,
        order.CustomerName,
        order.Status,
        order.PaymentStatus,
        order.FulfillmentType,
        order.PickupLocation,
        order.TransactionLocation,
        order.CreatedAt,
        order.Items.Select(OrderItemDto.FromEntity).ToList(),
        order.Items.Sum(i => i.UnitPriceSnapshot * i.Quantity));
}
