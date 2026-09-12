using System.ComponentModel.DataAnnotations;
using BakeTherapie.Api.Models;
using BakeTherapie.Api.Models.Enums;

namespace BakeTherapie.Api.DTOs;

public record CreateOrderItemRequest(
    [property: Required] int ProductId,
    [property: Range(1, 100)] int Quantity);

public record CreateOrderRequest(
    [property: Required, StringLength(200)] string CustomerName,
    [property: Required, StringLength(50)] string CustomerPhone,
    [property: Required, EmailAddress, StringLength(320)] string CustomerEmail,
    bool MarketingOptIn,
    [property: Required] FulfillmentType FulfillmentType,
    string? PickupLocation,
    [property: Required, StringLength(200)] string TransactionLocation,
    [property: Required, MinLength(1)] List<CreateOrderItemRequest> Items);

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
