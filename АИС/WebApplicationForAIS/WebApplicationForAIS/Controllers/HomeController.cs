using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.DirectoryServices.ActiveDirectory;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplicationForAIS.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            DirectoryEntry domain = new DirectoryEntry();
            ViewBag.Domain = "ilusha";
            ViewBag.Username = "par";
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}