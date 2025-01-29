using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ToDoApp.Models;

namespace ToDoApp.Services
{
    public class StudentService : IStudentService
    {
        private readonly IMongoCollection<Student> studentCollection;
        public StudentService(IStudentDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            studentCollection = database.GetCollection<Student>(settings.StudentCollectionName);
        }
        public async Task<Student> AddStudent(Student student)
        {
            await studentCollection.InsertOneAsync(student);
            return student;
        }

        public async Task<List<Student>> GetStudents()
        {
            try
            {
                var res = await studentCollection.Find<Student>(x => true).ToListAsync<Student>();
                return res;
            }
            catch (System.Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
            
        }
    }
}
