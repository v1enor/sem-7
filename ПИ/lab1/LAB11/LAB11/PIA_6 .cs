using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace LAB11
{
    public class PIA_6 : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            HttpRequest req = context.Request;
            HttpResponse res = context.Response;
            res.AddHeader("Content-Type", "text/html");

            if (req.HttpMethod == "GET")
            {
                res.WriteFile("Ilusha6.html");
            }
            else if (req.HttpMethod == "POST")
            {
                try
                {
                    var x = int.Parse(req.Form["x"]);
                    var y = int.Parse(req.Form["y"]);
                    var mul = x * y;
                    res.Write($"<body><html>{x} * {y} = {mul}</body></html>");
                }
                catch
                {
                    res.StatusCode = 400;
                    res.AddHeader("Content-Type", "text/html");
                    res.Write("<h2>Что-то не так ошибка 400 кста вот да.<h2>");
                }
            }
            else
            {
                res.StatusCode = 405;
                res.AddHeader("Content-Type", "text/html");
                res.Write("<h2>ээээээ, только GET/POST запросы брат/сестра.</h2>");
            }
        }

        public bool IsReusable => true;
    }
}
