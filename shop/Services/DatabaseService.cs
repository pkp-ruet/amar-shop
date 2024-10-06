using Microsoft.Extensions.Options;
using MongoDB.Driver;
using shop.Models;

namespace shop.Services
{
    public interface IDatabaseService
    {
        public Task RegisterUser(User user);
        public Task<User> GetUserByEmailAndPassword(LoginInfo loginInfo);
        Task<ShopModel> CreateShop(ShopModel shopModel);
        Task<Product> AddProduct(Product product);
        Task<List<Product>> GetProductsByShopId(string shopId);
        Task<ShopModel> GetShopByUserId(string userName);
        Task DeleteProductById(string productId);
    }
    public class DatabaseService: IDatabaseService
    {
        private readonly IMongoDatabase _database;

        public DatabaseService(IOptions<DatabaseSettings> databaseSettings)
        {
            var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
            _database = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
        }

        public async Task RegisterUser(User user)
        {
            user.Id = GetId();
            var userCollection = _database.GetCollection<User>("User");
            await userCollection.InsertOneAsync(user);
        }

        public async Task<User> GetUserByEmailAndPassword(LoginInfo loginInfo)
        {
            var userCollection = _database.GetCollection<User>("User");
            var user = await userCollection.Find(o => o.Email == loginInfo.Email && o.Password == loginInfo.Password)
                .FirstOrDefaultAsync();
            return user;
        }

        public async Task<User> GetUserByUsername(string username)
        {
            var userCollection = _database.GetCollection<User>("User");
            var user = await userCollection.Find(o => o.Name == username).FirstOrDefaultAsync();
            return user;
        }

        public async Task<ShopModel> CreateShop(ShopModel shopModel)
        {
            var shopCollection = _database.GetCollection<ShopModel>("Shop");
            shopModel.Id = GetId();
            await shopCollection.InsertOneAsync(shopModel);
            return shopModel;
        }

        public async Task<ShopModel> GetShopByUserId(string userId)
        {
            var shopCollection = _database.GetCollection<ShopModel>("Shop");
            var shop = await shopCollection.Find(o => o.Owner == userId).FirstOrDefaultAsync();
            return shop;
        }

        public async Task<Product> AddProduct(Product product)
        {
            product.Id = GetId();
            var productCollection = _database.GetCollection<Product>("Product");
            await productCollection.InsertOneAsync(product);
            return product;
        }

        public async Task<List<Product>> GetProductsByShopId(string shopId)
        {
            var productCollection = _database.GetCollection<Product>("Product");
            var products =  productCollection.Find(o => o.ShopId == shopId).ToList();
            return products;
        }

        public async Task DeleteProductById(string productId)
        {
            var productCollection = _database.GetCollection<Product>("Product");
            var filter = Builders<Product>.Filter
                .Eq(r => r.Id, productId);

            await productCollection.DeleteOneAsync(filter);
        }
        private string? GetId()
        {
            var id = Guid.NewGuid().ToString();
            id = id.Replace("-", "");
            id = id.Substring(0, 24);
            return id;
        }
    }
}
