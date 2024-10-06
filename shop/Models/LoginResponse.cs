namespace shop.Models
{
    public class LoginResponse
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Token { get; set; }
        public string ShopId { get; set; }
        public string ShopName { get; set; }
        public bool HasShop{ get; set; }
    }
}
