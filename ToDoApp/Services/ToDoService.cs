using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using ToDoApp.Models;

namespace ToDoApp
{
    public class ToDoService
    {
        private readonly IMongoCollection<ToDoItem> toDoItems;

        public ToDoService(IToDoDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            toDoItems = database.GetCollection<ToDoItem>(settings.ToDoCollectionName);
        }

        public ToDoItem Create(ToDoItem toDoItem)
        {
            toDoItems.InsertOne(toDoItem);
            return toDoItem;
        }
      
        public ToDoItem Update(ToDoItem toDoItem)
        {
            toDoItem.FinishDate = DateTime.Now;
            toDoItems.ReplaceOne(item => item.Id == toDoItem.Id, toDoItem);
            return toDoItem;
        }

        public List<ToDoItem> Get()
        {
            List<ToDoItem> ToDos;
            ToDos = toDoItems.Find(emp => true).ToList();
            return ToDos;
        }

        public ToDoItem Get(string id) =>
            toDoItems.Find<ToDoItem>(item => item.Id == id).FirstOrDefault();

        public List<ToDoItem> GetByUserId(string id) =>
           toDoItems.Find<ToDoItem>(item => item.UserId == id).ToList();

        internal void Delete(string id)
        {
            toDoItems.DeleteOne<ToDoItem>(item => item.Id == id);
        }
    }
}
