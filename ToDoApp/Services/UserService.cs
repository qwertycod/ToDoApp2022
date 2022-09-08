using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using ToDoApp;
using ToDoApp.Entities;
using ToDoApp.Helper;
using ToDoApp.Models;

namespace ToDoApp
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        List<User> Get();
        User GetById(string id);
        User Create(User User);
        void ClearToken(string token);
        string GetRefreshToken(string userName);
    }

    public class UserService : IUserService
    {
        private readonly IMongoCollection<User> Users;
        public static List<string> cacheToken = new List<string>();
        public static List<string> logOutCacheToken = new List<string>();
        //private List<User> _users = new List<User>
        //{
        //    new User { Id = "a1", FirstName = "Test", LastName = "User", Username = "test", Password = "test" }
        //};

        //internal object Get(string id)
        //{
        //    throw new NotImplementedException();
        //}

        private readonly AppSettings _appSettings;
        //public UserService(IOptions<AppSettings> appSettings)
        //{
        //    _appSettings = appSettings.Value;
        //}
        //public UserService(IUserDatabaseSettings settings)
        //{
        //    var client = new MongoClient(settings.ConnectionString);
        //    var database = client.GetDatabase(settings.DatabaseName);
        //    Users = database.GetCollection<User>(settings.UserCollectionName);
        //}

        public void ClearToken(string token)
        {
            logOutCacheToken.Add(token);
        }
        
        public UserService(IOptions<AppSettings> appSettings, IUserDatabaseSettings settings)
        {
            _appSettings = appSettings.Value;
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            Users = database.GetCollection<User>(settings.UserCollectionName);
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var user = Users.Find<User>(item => item.Username == model.Username && item.Password == model.Password).SingleOrDefault();

            if (user == null) return null;

            // authentication successful so generate jwt token
            var token = generateJwtToken(user);

            return new AuthenticateResponse(user, token);
        }

        private string generateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddMinutes(5),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            cacheToken.Add(token.Id);
            return tokenHandler.WriteToken(token);
        }

       
        //public IEnumerable<User> Get()
        //{
        //    return _users;
        //}

        //public User GetById(string id)
        //{
        //    return _users.FirstOrDefault(x => x.Id == id);
        //}
        public List<User> Get()
        {
            List<User> Userlist;
            Userlist = Users.Find(emp => true).ToList();
            return Userlist;
        }

        public User GetById(string id) =>
            Users.Find<User>(item => item.Id == id).FirstOrDefault();

        public User Create(User User)
        {
            Users.InsertOne(User);
            return User;
        }

        public User Update(User User)
        {
            Users.ReplaceOne(item => item.Id == User.Id, User);
            return User;
        }

        internal void Delete(string id)
        {
            Users.DeleteOne<User>(item => item.Id == id);
        }

        public string GetRefreshToken(string userName)
        {
            var x = Users.Find<User>(item => item.Username == userName).FirstOrDefault();
            return x.RefreshToken;
        }

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }
    }
}
