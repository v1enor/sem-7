using System;
using System.Web;

namespace PIS_Lab1
{
    public class IISHandler5 : IHttpHandler
    {
        public bool IsReusable
        {
            get { return true; }
        }

        public void ProcessRequest(HttpContext context)
        {
            HttpRequest req = context.Request;
            HttpResponse res = context.Response;
            res.AddHeader("Content-Type", "text/html");

            if (req.HttpMethod == "GET")
            {
                res.ContentType = "text/html";
                res.WriteFile("Task5.html");
            }
            else if (req.HttpMethod == "POST")
            {
                try
                {
                    var x = int.Parse(req.Form["x"]);
                    var y = int.Parse(req.Form["y"]);
                    var mul = x * y;
                    res.Write(mul);
                }
                catch
                {
                    res.StatusCode = 400;
                    res.AddHeader("Content-Type", "text/html");
                    res.Write("<h2>X and Y parameters are not provided.<h2>");
                }
            }
            else
            {
                res.StatusCode = 405;
                res.AddHeader("Content-Type", "text/html");
                res.Write("<h2>Incorrect method.</h2>");
            }
        }
    }
}
