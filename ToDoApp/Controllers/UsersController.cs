using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using ToDoApp.Entities;
using ToDoApp.Helper;
using ToDoApp.Models;

namespace ToDoApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : Controller
    {
        private IUserService _userService;
        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _userService.Authenticate(model);
            if (response == null)
            {
                return Unauthorized(new { message = "Username or password is incorrect" });
            }

            return Ok(response);
        }

        [Helper.Authorize]
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.Get();
            return Ok(users);
        }

        [Helper.IsAdmin]
        [HttpPost]
        public IActionResult Create(User user)
        {
            var addedUserWithId = _userService.Create(user);
            return Created("", new { user = addedUserWithId });
        }
        public ActionResult Login()
        {
            return View();
        }

        [Helper.Authorize]
        [HttpPost("logout")]
        public IActionResult Logout(string token)
        {
            //  HttpContext.Session.Clear();
            _userService.ClearToken(token);
            return Ok();
        }

        private void setTokenCookie(string token)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7)
            };
            Response.Cookies.Append("refreshToken", token, cookieOptions);
        }

        private string ipAddress()
        {
            if (Request.Headers.ContainsKey("X-Forwarded-For"))
                return Request.Headers["X-Forwarded-For"];
            else
                return HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
        }
    }
}
