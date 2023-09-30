using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Newtonsoft.Json;
using PIS_Lab4.Models;
using PIS_Lab4.UnitOfWorkPattern;

namespace PIS_Lab4.Controllers
{
    public class DictController : Controller
    {
        private UnitOfWork context = new UnitOfWork();


        // GET: Index
        public ActionResult Index()
        {
            var books = context.DictRepository.GetPhoneBooks().OrderBy(x => x.Surname).ToList();
            return View(books);
        }


        // GET: Create
        public ActionResult Create()
        {
            return View();
        }


        // POST: Create
        [HttpPost]
        public ActionResult Create(PhoneBook phoneBook)
        {
            var isSuccessfulCreate = context.DictRepository.AddPhoneBook(phoneBook);
            if (isSuccessfulCreate)
                TempData["success"] = "Phonebook created succesfully";
            else
                TempData["error"] = "Failed to create phonebook";
            return Redirect("/./");
        }


        // GET: Edit
        public ActionResult Edit(int? id)
        {
            var phoneWithId = context.DictRepository.GetPhoneBooks().First(x => x.Id == id);
            return View(phoneWithId);
        }


        // POST: Edit
        [HttpPost]
        public ActionResult Edit(PhoneBook phoneBook)
        {
            var isSuccessfullUpdate = context.DictRepository.UpdatePhoneBook(phoneBook);
            if (isSuccessfullUpdate)
                TempData["success"] = "Phonebook updated succesfully";
            else
                TempData["error"] = "Failed to update phonebook";
            return Redirect("/./");
        }


        // POST: Delete
        [HttpPost]
        public ActionResult Delete(PhoneBook phoneBook)
        {
            var isSuccessfullDelete = context.DictRepository.DeletePhoneBook(phoneBook);
            if (isSuccessfullDelete)
                TempData["success"] = "Phonebook deleted succesfully";
            else
                TempData["error"] = "Failed to delete phonebook";
            return Redirect("/./");
        }
    }
}
