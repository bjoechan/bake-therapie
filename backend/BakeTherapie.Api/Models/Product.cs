namespace BakeTherapie.Api.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? TaglineShort { get; set; }
    public List<string> PromotionalTags { get; set; } = [];
    public string? Summary { get; set; }
    public string? FullDescription { get; set; }
    public string? ImageUrl { get; set; }
    public decimal Price { get; set; }
    public bool IsAvailable { get; set; } = true;
    public int DisplayOrder { get; set; }
}
