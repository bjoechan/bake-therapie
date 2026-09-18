using BakeTherapie.Api.Models;

namespace BakeTherapie.Api.Data;

// Seeded from the launch lineup that was previously hardcoded in frontend/src/App.jsx.
// Price is a $4.50 placeholder for every item — update via the database (or the future
// admin catalog UI in Phase 4) before this goes live with real pricing.
internal static class ProductSeedData
{
    public static Product[] Products { get; } =
    [
        new Product
        {
            Id = 1,
            Name = "Ruth's Chocolate Chips",
            TaglineShort = "Cookie drop classic",
            Summary = "Rich brown butter dough loaded with semi-sweet and Belgian dark chocolate.",
            ImageUrl = "/images/closeups/ruth-chocolate-chips.png",
            Price = 4.50m,
            IsAvailable = true,
            DisplayOrder = 0,
        },
        new Product
        {
            Id = 2,
            Name = "Ash's Daily Matcha",
            TaglineShort = "Earthy and creamy",
            Summary = "Earthy matcha paired with smooth Belgian white chocolate.",
            ImageUrl = "/images/closeups/ash-daily-matcha.png",
            Price = 4.50m,
            IsAvailable = true,
            DisplayOrder = 1,
        },
        new Product
        {
            Id = 3,
            Name = "Charlie's Triple Chocolate",
            TaglineShort = "For chocolate lovers",
            Summary = "Rich cocoa cookie loaded with three varieties of chocolate.",
            ImageUrl = "/images/closeups/charlie-triple-chocolate.png",
            Price = 4.50m,
            IsAvailable = true,
            DisplayOrder = 2,
        },
        new Product
        {
            Id = 4,
            Name = "Lotso's Strawberry Basket",
            TaglineShort = "Bright and fruity",
            Summary = "Sweet cookie bursting with bright, strawberry flavor.",
            ImageUrl = "/images/closeups/lotso-strawberry-basket.png",
            Price = 4.50m,
            IsAvailable = true,
            DisplayOrder = 3,
        },
        new Product
        {
            Id = 5,
            Name = "Garfield's Morning Brew",
            TaglineShort = "Bold coffee hit",
            Summary = "Bold Japanese coffee cookie topped with toasted almond slivers.",
            ImageUrl = "/images/closeups/garfield-morning-brew.png",
            Price = 4.50m,
            IsAvailable = true,
            DisplayOrder = 4,
        },
        new Product
        {
            Id = 6,
            Name = "Earl's Rubies",
            TaglineShort = "Fragrant tea notes",
            Summary = "Fragrant Earl Grey cookie dotted with tart dried cranberries.",
            ImageUrl = "/images/closeups/earl-rubies.png",
            Price = 4.50m,
            IsAvailable = true,
            DisplayOrder = 5,
        },
    ];
}
