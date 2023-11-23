using laba3a.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace laba3a.Controllers
{
	public class HomeController : Controller
	{
		private readonly ILogger<HomeController> _logger;

		public HomeController(ILogger<HomeController> logger)
		{
			_logger = logger;
		}

		public IActionResult Index()
		{
			return View("Calc");
		}

		public IActionResult Sum([FromForm] string? x,[FromForm] string? y)
		{
			ViewBag.press = "+";
			if (!string.IsNullOrWhiteSpace(x) && !string.IsNullOrWhiteSpace(y))
			{
				try
				{
					
					var resultX = float.Parse(x);
					var resultY = float.Parse(y);
					ViewBag.x = resultX;
					ViewBag.y = resultY;
					ViewBag.z = resultX + resultY;
				}
				catch (Exception err) { ViewBag.Error = err.Message; }
			}
			return View("Calc");
		}

		public IActionResult Sub([FromForm] string? x, [FromForm] string? y)
		{
			ViewBag.press = "-";
			if (!string.IsNullOrWhiteSpace(x) && !string.IsNullOrWhiteSpace(y))
			{
				try
				{

					var resultX = float.Parse(x);
					var resultY = float.Parse(y);
					ViewBag.x = resultX;
					ViewBag.y = resultY;
					ViewBag.z = resultX - resultY;
				}
				catch (Exception err) { ViewBag.Error = err.Message; }
			}
			return View("Calc");
		}

		public IActionResult Mul([FromForm] string? x, [FromForm] string? y)
		{
			ViewBag.press = "*";
			if (!string.IsNullOrWhiteSpace(x) && !string.IsNullOrWhiteSpace(y))
			{
				try
				{

					var resultX = float.Parse(x);
					var resultY = float.Parse(y);
					ViewBag.x = resultX;
					ViewBag.y = resultY;
					ViewBag.z = resultX * resultY;
				}
				catch (Exception err) { ViewBag.Error = err.Message; }
			}
			return View("Calc");
		}

		public IActionResult Div([FromForm] string? x, [FromForm] string? y)
		{
			ViewBag.press = "/";
			if (!string.IsNullOrWhiteSpace(x) && !string.IsNullOrWhiteSpace(y))
			{
				try
				{

					var resultX = float.Parse(x);
					var resultY = float.Parse(y);
					ViewBag.x = resultX;
					ViewBag.y = resultY;
					ViewBag.z = resultX / resultY;
				}
				catch (Exception err) { ViewBag.Error = err.Message; }
			}
			return View("Calc");
		}
	}
}