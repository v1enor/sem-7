using System;
using System.Web;

namespace PIS_Lab1
{
    public class IISHandler3 : IHttpHandler
    {
        public bool IsReusable
        {
            get { return true; }
        }

        public void ProcessRequest(HttpContext context)
        {
            HttpRequest req = context.Request;
            HttpResponse res = context.Response;

            if (req.HttpMethod != "PUT")
            {
                res.StatusCode = 405;
                res.AddHeader("Content-Type", "text/html");
                res.Write("<h2>Only PUT method allowed.</h2>");
            }
            else
            {
                var parmA = req["parmA"];
                var parmB = req["parmB"];
                res.AddHeader("Content-Type", "text/plain");
                res.Write($"===== PUT =====\n" +
                          $"parmA = {(parmA != null ? parmA : "null")}\n" +
                          $"parmB = {(parmB != null ? parmB : "null")}");
            }
        }
    }
}
