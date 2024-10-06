using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using shop.Models;
using shop.Services;
using System.Text;

namespace shop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IDatabaseService _databaseService;
        private readonly IConfiguration _configuration;
        public UserController(IDatabaseService databaseService, IConfiguration configuration)
        {
            _databaseService = databaseService;
            _configuration = configuration;
        }

        [HttpPost("register")]

        public async Task<IActionResult> Register([FromBody] User user)
        {
            await _databaseService.RegisterUser(user);
            return Ok(user);
        }

        private string? GetId()
        {
            var id = Guid.NewGuid().ToString();
            id = id.Replace("-", "");
            id = id.Substring(0, 24);
            return id;
        }

        [HttpPost("login")]

        public async Task<IActionResult> Login([FromBody] LoginInfo loginInfo)
        {
            var user = await _databaseService.GetUserByEmailAndPassword(loginInfo);
            if (user==null)
            {
                return BadRequest();
            }
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? string.Empty));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Name, user.Name),
                new(JwtRegisteredClaimNames.NameId, user.Id)
            };
            var jwtSecurityToken = new JwtSecurityToken(_configuration["Jwt:Issuer"] ?? string.Empty,
                _configuration["Jwt:Issuer"] ?? string.Empty,
                claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials);

            var token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
            var shop = await _databaseService.GetShopByUserId(user.Id);
            var response = new LoginResponse
            {
                UserId = user.Id,
                UserName = user.Name,
                Token = token,
                HasShop = false
            };
            if (shop != null)
            {
                response.HasShop = true;
                response.ShopId = shop.Id;
                response.ShopName = shop.Name;
            }
            return Ok(response);
        }
    }
}
