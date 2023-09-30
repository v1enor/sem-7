using System.Web.Mvc;

namespace pis2.Controllers
{
    public class ErrorController : Controller
    {
        // GET: Error
        public string PageNotFound()
        {
            var str = "";
            
            for (var i = 5; i < HttpContext.Request.Url.Query.Length; i++) 
            {
                str += HttpContext.Request.Url.Query[i];
            }

            return $"[ERROR] 404: Cannot find {HttpContext.Request.HttpMethod}:{str}";
        }
    }
}