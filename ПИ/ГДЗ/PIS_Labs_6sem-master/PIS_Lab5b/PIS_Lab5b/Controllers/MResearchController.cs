using System.Web.Mvc;

namespace PIS_Lab5b.Controllers
{
    [RoutePrefix("it")]
    public class MResearchController : Controller
    {
        [AcceptVerbs("GET")]
        [Route("{n:int}/{str}")]
        public string M01(int n, string str) => $"{HttpContext.Request.HttpMethod}: M01: /{n}/{str}";


        [AcceptVerbs("GET", "POST")]
        [Route("{b:bool}/{letters:alpha}")]     /// alpha = буквенные символы на латинице
        public string M02(bool b, string letters) => $"{HttpContext.Request.HttpMethod}: M02: /{b}/{letters}";


        [AcceptVerbs("GET", "DELETE")]
        [Route("{f:float}/{str:length(2,5)}")]
        public string M03(float f, string str) => $"{HttpContext.Request.HttpMethod}: M03: /{f}/{str}";


        [AcceptVerbs("PUT")]
        [Route("{letters:alpha:length(3,4)}/{n:int:range(100,200)}")]
        public string M04(string letters, int n) => $"{HttpContext.Request.HttpMethod}: M04: /{letters}/{n}";


        [AcceptVerbs("POST")]
        [Route("{mail:regex(^\\w+@\\w+\\.\\w+$)}")]
        public string M05(string mail) => $"{HttpContext.Request.HttpMethod}: M05: /{mail}";


        public string MXX() => "404 Error";
    }
}