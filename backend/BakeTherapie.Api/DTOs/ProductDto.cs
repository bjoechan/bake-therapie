using BakeTherapie.Api.Models;

namespace BakeTherapie.Api.DTOs;

public record ProductDto(
    int Id,
    string Name,
    string? TaglineShort,
    List<string> PromotionalTags,
    string? Summary,
    string? FullDescription,
    string? ImageUrl,
    decimal Price,
    int DisplayOrder)
{
    public static ProductDto FromEntity(Product product) => new(
        product.Id,
        product.Name,
        product.TaglineShort,
        product.PromotionalTags,
        product.Summary,
        product.FullDescription,
        product.ImageUrl,
        product.Price,
        product.DisplayOrder);
}
