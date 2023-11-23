using Microsoft.AspNetCore.Mvc;

namespace ASPCMVC07.Controllers
{
    [Route("/it/")]
    public class TAResearch : Controller
    {
        [HttpGet("{n:int}/{str}", Order = 1)]
        public IActionResult M04(int n, [FromRoute] string str)
        {
            ViewBag.n = n;
            ViewBag.str = str;

            return View();
        }

        [HttpGet("{b:bool}/{str:alpha}")]
        [HttpPost("{b:bool}/{str:alpha}")]
        public IActionResult M05(bool b, string str)
        {  
             ViewBag.RequestMethod = HttpContext.Request.Method;
             ViewBag.b = b;
             ViewBag.str = str;

             return View();
          
        }

        [HttpGet("{f:float}/{str:length(2,5)}", Order = 2)]
        [HttpDelete("{f:float}/{str:length(2,5)}")]
        public IActionResult M06([FromRoute] float f, [FromRoute] string str)
        {
            if (f % 1 == 0)
            {
                return BadRequest();
            }
            ViewBag.RequestMethod = HttpContext.Request.Method;
             ViewBag.f = f;
             ViewBag.str = str;

             return View();
        }


        [HttpPut("{str:alpha:length(3,4)}/{n:int:range(100,200)}")]
        public IActionResult M07([FromRoute] string str, int n)
        {
             ViewBag.str = str;
             ViewBag.n = n;

             return View();
  
        }

        [HttpPost("{mail:regex(^(([[a-z0-9_-]]+\\.))*[[a-z0-9_-]]+@[[a-z0-9_-]]+((\\.[[a-z0-9_-]]+))*\\.[[a-z]]{{2,6}}$)}")]
        public IActionResult M08([FromRoute] string mail)
        {
             ViewBag.mail = mail;

             return View();
            
        }
    }
}
