using Microsoft.AspNetCore.Mvc;

namespace ASPCMVC04.Controllers
{
    public class StatusController : Controller
    {
        public IActionResult S200()
        {
            var rnd = new Random();
            var randomCode = rnd.Next(200, 299);
            return StatusCode(randomCode, "OK");
        }

        public IActionResult S300()
        {
            var rnd = new Random();
            var randomCode = rnd.Next(300, 399);
            return StatusCode(randomCode, "Redirect");
        }

        public IActionResult S500()
        {
            var rnd = new Random();
            var randomCode = rnd.Next(500, 599);
            return StatusCode(randomCode, "Error division on zero");
        }
    }
}
