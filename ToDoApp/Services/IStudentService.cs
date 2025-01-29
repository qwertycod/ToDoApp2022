using System.Collections.Generic;
using System.Threading.Tasks;
using ToDoApp.Models;

namespace ToDoApp.Services
{
    public interface IStudentService
    {
          Task<List<Student>> GetStudents();

          Task<Student> AddStudent(Student student);
    }
}
