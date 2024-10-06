using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using shop.Models;
using shop.Services;

namespace shop.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ShopController : ControllerBase
    {
        private readonly IDatabaseService _databaseService;
        public ShopController(IDatabaseService databaseService)
        {
            _databaseService = databaseService;
        }

        [HttpPost("create-shop")]

        public async Task<IActionResult> CreateShop(ShopModel shopModel)
        {
            var authHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();
            if (authHeader != null && authHeader.StartsWith("Bearer"))
            {
                var token = authHeader.Substring("Bearer ".Length).Trim();
                var handler = new JwtSecurityTokenHandler();
                var jwtToken = handler.ReadToken(token) as JwtSecurityToken;
                if (jwtToken != null)
                {
                    var userId = jwtToken.Claims.FirstOrDefault(claim => claim.Type == "nameid")?.Value;
                    shopModel.Owner = userId;
                }
            }
            await _databaseService.CreateShop(shopModel);
            return Ok(shopModel);
        }
        [HttpGet("get-shop")]
        public async Task<IActionResult> GetShop()
        {
            var authHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();
            if (authHeader != null && authHeader.StartsWith("Bearer"))
            {
                var token = authHeader.Substring("Bearer ".Length).Trim();
                var handler = new JwtSecurityTokenHandler();
                var jwtToken = handler.ReadToken(token) as JwtSecurityToken;
                if (jwtToken != null)
                {
                    var userName = jwtToken.Claims.FirstOrDefault(claim=> claim.Type=="name")?.Value;
                    if (userName != null)
                    {
                        var shop = await _databaseService.GetShopByUserId(userName);
                        return Ok(shop);
                    }
                }
            }

            return BadRequest();
        }

        [HttpPost("add-product")]

        public async Task<IActionResult> AddProduct(Product product)
        {
            await _databaseService.AddProduct(product);
            return Ok(product);
        }

        [HttpGet("get-products")]

        public async Task<IActionResult> GetProducts(string shopId)
        {
            var products = await _databaseService.GetProductsByShopId(shopId);
            return Ok(products);
        }

        [HttpPost("delete-product")]

        public async Task<IActionResult> DeleteProduct(string productId)
        {
            await _databaseService.DeleteProductById(productId);
            return Ok();
        }
    }
}
