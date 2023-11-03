using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace LAB11
{
    public class PIA_4 : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            int x = int.Parse(context.Request.Params["x"]);
            int y = int.Parse(context.Request.Params["y"]);

            int sum = x + y;

            context.Response.ContentType = "text/plain";
            context.Response.Write(sum.ToString());
        }

        public bool IsReusable => false;
    }
}
