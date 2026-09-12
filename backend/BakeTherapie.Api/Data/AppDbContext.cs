using BakeTherapie.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace BakeTherapie.Api.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>(entity =>
        {
            entity.Property(p => p.Name).IsRequired().HasMaxLength(200);
            entity.Property(p => p.Price).HasColumnType("decimal(10,2)");
            entity.Property(p => p.PromotionalTags)
                .HasConversion(
                    tags => string.Join(';', tags),
                    value => value == string.Empty
                        ? new List<string>()
                        : value.Split(';', StringSplitOptions.RemoveEmptyEntries).ToList())
                .Metadata.SetValueComparer(new ValueComparer<List<string>>(
                    (a, b) => (a ?? new()).SequenceEqual(b ?? new()),
                    tags => tags.Aggregate(0, (hash, tag) => HashCode.Combine(hash, tag.GetHashCode())),
                    tags => tags.ToList()));
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.Property(o => o.CustomerName).IsRequired().HasMaxLength(200);
            entity.Property(o => o.CustomerPhone).IsRequired().HasMaxLength(50);
            entity.Property(o => o.CustomerEmail).IsRequired().HasMaxLength(320);
            entity.Property(o => o.TransactionLocation).IsRequired().HasMaxLength(200);
            entity.Property(o => o.Status).HasConversion<string>().HasMaxLength(20);
            entity.Property(o => o.PaymentStatus).HasConversion<string>().HasMaxLength(20);
            entity.Property(o => o.FulfillmentType).HasConversion<string>().HasMaxLength(20);

            entity.HasMany(o => o.Items)
                .WithOne(i => i.Order)
                .HasForeignKey(i => i.OrderId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.Property(i => i.ProductNameSnapshot).IsRequired().HasMaxLength(200);
            entity.Property(i => i.UnitPriceSnapshot).HasColumnType("decimal(10,2)");

            entity.HasOne(i => i.Product)
                .WithMany()
                .HasForeignKey(i => i.ProductId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }
}
