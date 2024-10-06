using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace shop.Models
{
    public class Product
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; } 

        public string ShopId { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }

    }
}
