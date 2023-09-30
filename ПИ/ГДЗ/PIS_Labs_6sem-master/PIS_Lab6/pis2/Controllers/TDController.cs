using pis2.Contracts;
using pis2.Models;
using System.Web.Mvc;


namespace pis2.Controllers
{
    public class TDController : Controller
    {
        private ITD _tdService;

        public TDController(ITD tdService)
        {
            _tdService = tdService;
        }


        public ActionResult Index()
        {
            var model = _tdService.GetAll();
            return View(model);
        }


        public ActionResult Add(string phoneNumber, string ownerName)
        {
            return View();
        }


        public ActionResult Update(int id)
        {
            var model = _tdService.Get(id);
            return View(model);
        }


        public ActionResult Delete(int id)
        {
            var model = _tdService.Get(id);
            return View(model);
        }


        [HttpPost]
        public ActionResult AddSave(string phoneNumber, string ownerName)
        {
            _tdService.Add(phoneNumber, ownerName);
            return View("Index", _tdService.GetAll());
        }


        [HttpPost]
        public ActionResult DeleteSave(int id)
        {
            _tdService.Delete(id);
            return View("Index", _tdService.GetAll());
        }


        [HttpPost]
        public ActionResult UpdateSave(int id, string phoneNumber, string ownerName)
        {
            _tdService.Update(new Phone(id, phoneNumber, ownerName));
            return View("Index", _tdService.GetAll());
        }
    }
}