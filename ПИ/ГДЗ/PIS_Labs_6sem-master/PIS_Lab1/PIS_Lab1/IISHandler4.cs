using System;
using System.Web;

namespace PIS_Lab1
{
    public class IISHandler4 : IHttpHandler
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

            if (req.HttpMethod == "POST")
            {
                try
                {
                    var x = int.Parse(req.Form["x"]);
                    var y = int.Parse(req.Form["y"]);
                    var sum = x + y;
                    res.Write(sum);
                }
                catch
                {
                    res.StatusCode = 400;
                    res.AddHeader("Content-Type", "text/html");
                    res.Write("Enter correct numbers!");
                }
            }
            else
            {
                res.StatusCode = 405;
                res.AddHeader("Content-Type", "text/html");
                res.Write("<h2>Only POST method allowed.</h2>");
            }
        }
    }
}
