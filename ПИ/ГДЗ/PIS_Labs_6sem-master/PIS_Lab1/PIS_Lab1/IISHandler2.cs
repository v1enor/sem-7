using System;
using System.Web;

namespace PIS_Lab1
{
    public class IISHandler2 : IHttpHandler
    {
        public bool IsReusable
        {
            get { return true; }
        }

        public void ProcessRequest(HttpContext context)
        {
            HttpRequest req = context.Request;
            HttpResponse res = context.Response;

            if (req.HttpMethod != "POST")
            {
                res.StatusCode = 405;
                res.AddHeader("Content-Type", "text/html");
                res.Write("<h2>Only POST method allowed.</h2>");
            }
            else
            {
                var parmA = req.Form["parmA"];
                var parmB = req.Form["parmB"];
                res.AddHeader("Content-Type", "text/plain");
                res.Write($"===== POST =====\n" +
                          $"parmA = {(parmA != null ? parmA : "null")}\n" +
                          $"parmB = {(parmB != null ? parmB : "null")}");
            }
        }
    }
}
