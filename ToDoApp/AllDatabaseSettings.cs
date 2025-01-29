namespace ToDoApp
{
    public class ToDoDatabaseSettings : IToDoDatabaseSettings
    {
        public string ToDoCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IToDoDatabaseSettings : ICommonDatabaseSettings
    {
        public string ToDoCollectionName { get; set; }
    }

    public class StudentDatabaseSettings : IStudentDatabaseSettings
    {
        public string StudentCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IStudentDatabaseSettings : ICommonDatabaseSettings
    {
        public string StudentCollectionName { get; set; }
    }
}
