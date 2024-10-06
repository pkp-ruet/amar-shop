using Microsoft.AspNetCore.Http.HttpResults;

namespace shop.Services
{
    public interface IShopService
    {
    }
    public class ShopService: IShopService
    {
        private readonly IDatabaseService _databaseService;
        public ShopService(IDatabaseService databaseService)
        {
            _databaseService = databaseService;
        }
    }
}
