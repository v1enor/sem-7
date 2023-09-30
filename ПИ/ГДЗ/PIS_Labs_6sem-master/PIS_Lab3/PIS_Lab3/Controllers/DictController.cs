using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Newtonsoft.Json;
using PIS_Lab3.Models;

namespace PIS_Lab3.Controllers
{
    public class DictController : Controller
    {

        // GET: Index
        public ActionResult Index()
        {
            var books = GetPhoneBooks().OrderBy(x => x.Surname).ToList();
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
            var newBooksList = GetPhoneBooks();
            phoneBook.Id = GetFirstFreeId();
            newBooksList.Add(phoneBook);
            var convertedJson = JsonConvert.SerializeObject(newBooksList, Formatting.Indented);
            System.IO.File.WriteAllText(Server.MapPath("~/App_Data/phoneBooks.json"), convertedJson);
            TempData["success"] = "Phonebook created succesfully";
            return Redirect("/./");
        }


        // GET: Edit
        public ActionResult Edit(int? id)
        {
            var phoneWithId = GetPhoneBooks().First(x => x.Id == id);
            return View(phoneWithId);
        }


        // POST: Edit
        [HttpPost]
        public ActionResult Edit(PhoneBook phoneBook)
        {
            var books = GetPhoneBooks();
            var bookFromJson = books.Find(x => x.PhoneNumber == phoneBook.PhoneNumber);
            books.Remove(bookFromJson);
            phoneBook.Id = bookFromJson.Id;
            books.Add(phoneBook);
            var convertedJson = JsonConvert.SerializeObject(books, Formatting.Indented);
            System.IO.File.WriteAllText(Server.MapPath("~/App_Data/phoneBooks.json"), convertedJson);
            TempData["success"] = "Phonebook updated succesfully";
            return Redirect("/./");
        }


        // POST: Delete
        [HttpPost]
        public ActionResult Delete(PhoneBook phoneBook)
        {
            var books = GetPhoneBooks();
            var bookFromJson = books.Find(x => x.Id == phoneBook.Id);
            books.Remove(bookFromJson);
            var convertedJson = JsonConvert.SerializeObject(books, Formatting.Indented);
            System.IO.File.WriteAllText(Server.MapPath("~/App_Data/phoneBooks.json"), convertedJson);
            TempData["success"] = "Phonebook deleted succesfully";
            return Redirect("/./");
        }






        // Method to get first free ID in JSON list, 
        // e.g. if we deleted elements with id=4 and id=5,
        // this method will return me 4 as first free id.
        // If we have consecutive ids (1,2,3,...,10),
        // this method will return 11.
        private int GetFirstFreeId()
        {
            var ids = GetPhoneBooks().Select(x => x.Id).ToList();
            var firstFreeId = 0;
            for (int i = 1; i <= ids.Max(); i++)
            {
                firstFreeId = i;
                if (!ids.Contains(firstFreeId))
                    return firstFreeId;
            }
            return firstFreeId + 1;
        }


        // Get books from JSON
        private List<PhoneBook> GetPhoneBooks()
        {
            string json = System.IO.File.ReadAllText(Server.MapPath("~/App_Data/phoneBooks.json"));
            List<PhoneBook> books = JsonConvert.DeserializeObject<List<PhoneBook>>(json);
            return books;
        }

    }
}
