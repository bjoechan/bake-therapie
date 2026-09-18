using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BakeTherapie.Api.Migrations
{
    /// <inheritdoc />
    public partial class SeedInitialProducts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "DisplayOrder", "FullDescription", "ImageUrl", "IsAvailable", "Name", "Price", "PromotionalTags", "Summary", "TaglineShort" },
                values: new object[,]
                {
                    { 1, 0, null, "/images/closeups/ruth-chocolate-chips.png", true, "Ruth's Chocolate Chips", 4.50m, "", "Rich brown butter dough loaded with semi-sweet and Belgian dark chocolate.", "Cookie drop classic" },
                    { 2, 1, null, "/images/closeups/ash-daily-matcha.png", true, "Ash's Daily Matcha", 4.50m, "", "Earthy matcha paired with smooth Belgian white chocolate.", "Earthy and creamy" },
                    { 3, 2, null, "/images/closeups/charlie-triple-chocolate.png", true, "Charlie's Triple Chocolate", 4.50m, "", "Rich cocoa cookie loaded with three varieties of chocolate.", "For chocolate lovers" },
                    { 4, 3, null, "/images/closeups/lotso-strawberry-basket.png", true, "Lotso's Strawberry Basket", 4.50m, "", "Sweet cookie bursting with bright, strawberry flavor.", "Bright and fruity" },
                    { 5, 4, null, "/images/closeups/garfield-morning-brew.png", true, "Garfield's Morning Brew", 4.50m, "", "Bold Japanese coffee cookie topped with toasted almond slivers.", "Bold coffee hit" },
                    { 6, 5, null, "/images/closeups/earl-rubies.png", true, "Earl's Rubies", 4.50m, "", "Fragrant Earl Grey cookie dotted with tart dried cranberries.", "Fragrant tea notes" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 6);
        }
    }
}
