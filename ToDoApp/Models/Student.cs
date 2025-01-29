using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;

namespace ToDoApp.Models
{
    public class Student
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; }
        public string UserId { get; set; }
        public int Year { get; set; }
        public string CourseId { get; set; }
    }
}
