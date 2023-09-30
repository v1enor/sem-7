using System.Web.Mvc;
using PIS_Lab5b.Filters;

namespace PIS_Lab5b.Controllers
{
    public class AResearchController : Controller
    {
        [AAFilter]
        public ActionResult AA() { return Content("AA"); }

        [ARFilter]
        public ActionResult AR() { return Content("AR"); }

        [AEFilter]
        public ActionResult AE() 
        {
            int a = 0, b = 0;
            int c = a / b;
            return Content("AE");
        }
    }
}