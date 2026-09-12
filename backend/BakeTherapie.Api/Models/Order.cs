using BakeTherapie.Api.Models.Enums;

namespace BakeTherapie.Api.Models;

public class Order
{
    public int Id { get; set; }

    public string CustomerName { get; set; } = string.Empty;
    public string CustomerPhone { get; set; } = string.Empty;
    public string CustomerEmail { get; set; } = string.Empty;
    public bool MarketingOptIn { get; set; }

    public OrderStatus Status { get; set; } = OrderStatus.New;
    public PaymentStatus PaymentStatus { get; set; } = PaymentStatus.Unpaid;

    public FulfillmentType FulfillmentType { get; set; }
    public string? PickupLocation { get; set; }
    public string TransactionLocation { get; set; } = string.Empty;

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset UpdatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? FulfilledAt { get; set; }

    public List<OrderItem> Items { get; set; } = [];
}
