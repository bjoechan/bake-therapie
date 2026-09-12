using BakeTherapie.Api.Data;
using BakeTherapie.Api.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BakeTherapie.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(AppDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<ProductDto>>> GetProducts()
    {
        var products = await db.Products
            .Where(p => p.IsAvailable)
            .OrderBy(p => p.DisplayOrder)
            .ToListAsync();

        return Ok(products.Select(ProductDto.FromEntity));
    }
}
