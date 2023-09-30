using System.Web.Mvc;
using PIS_Lab4.Models;

namespace PIS_Lab4.Controllers
{
    public class ErrorController : Controller
    {
        public ActionResult Error404()
        {
            Response.StatusCode = 404;
            var requestedPath = HttpContext.Request.RawUrl.ToString().Substring(1);
            TempData["error"] = $"{requestedPath} does not exist.";
            var method = HttpContext.Request.HttpMethod;
            var requestedUrl = HttpContext.Request.Url.ToString().Split(';')[1];     // get requested incorrect url
            var error = new Error(method, requestedUrl, string.Empty);
            return View(error);
        }
    }
}