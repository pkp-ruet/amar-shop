using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace shop.Models
{
    public class ShopModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Owner { get; set; }

    }
}
