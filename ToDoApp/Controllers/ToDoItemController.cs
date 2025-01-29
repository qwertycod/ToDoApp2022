using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net;
using ToDoApp;
using ToDoApp.Helper;
using ToDoApp.Models;

namespace ToDoApi.Controllers
{
    [ToDoApp.Helper.Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoItemController : Controller
    {
        private readonly ToDoService _toToService;
        private readonly ICacheService _cacheService;


        public ToDoItemController(ToDoService toToService, ICacheService cacheService)
        {
            this._toToService = toToService;
            this._cacheService = cacheService;
        }
        [HttpGet]
        public ActionResult<List<ToDoItem>> Get()
        {
             var r =  this._cacheService.GetOrAdd("TodoList",  () => _toToService.Get());
           // var r = _toToService.Get();
            return r;
        }
        public ActionResult Index(int i)
        {
            return Json(1);
        }
        public ActionResult Index(double i)
        {
            return Json(1.2);
        }

        [HttpGet("{id:length(24)}")]
        //   [HttpGet]
        public ActionResult<ToDoItem> Get(string id)
        {
            var r = _toToService.Get(id);
            return r == null ? NotFound() : (ActionResult<ToDoItem>)r;
        }


        [HttpGet("{id:length(24)}")]
        [Route("GetByUserId/{id}")]
        public ActionResult<List<ToDoItem>> GetByUserId(string id)
        {
            var r = this._cacheService.GetOrAdd("getUserById_" + id, () =>  _toToService.GetByUserId(id));
            return r == null ? NotFound() : (ActionResult<List<ToDoItem>>)r;
        }

        [HttpPost]
        [Route("Add/")]
        public IActionResult AddToDoItem(ToDoItem item)
        {
            try
            {
                string id = _toToService.Create(item).Id;
                return Created("", new { id = id });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut]
        [Route("Update/")]
        public IActionResult UpdateToDoItem(ToDoItem item)
        {
            try
            {
                ToDoItem toDoItem = _toToService.Update(item);
                return Ok(toDoItem);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpDelete]
        [Route("Delete/{id:length(24)}")]
        public IActionResult DeleteToDoItem(string id)
        {
            try
            {
                _toToService.Delete(id);
                return Ok(HttpStatusCode.NoContent);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}
