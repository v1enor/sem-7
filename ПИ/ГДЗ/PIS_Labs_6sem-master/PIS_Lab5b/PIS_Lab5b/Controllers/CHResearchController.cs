using System;
using System.Web.Mvc;
using System.Web.UI;

namespace PIS_Lab5b.Controllers
{
    public class CHResearchController : Controller
    {
        static int x = 0;

        
        [HttpGet]
        [OutputCache(Duration = 5, Location = OutputCacheLocation.Server)]
        public ActionResult AD() 
        {
            x++;
            return Content($"AD: x = {x} ({DateTime.Now})");
        }


        [HttpPost]
        [OutputCache(Duration = 7, VaryByParam = "x;y", Location = OutputCacheLocation.ServerAndClient)]
        public ActionResult AP(string x, string y)
        {
            return Content($"AP: x = {x}, y = {y} ({DateTime.Now})");
        }
    }
}