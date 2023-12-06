using Microsoft.AspNetCore.Mvc;

namespace laba3a.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
