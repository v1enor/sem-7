using System;
using System.Web;

namespace lab01
{
    public class SKM_GET : IHttpHandler
    {
        public bool IsReusable
        {
            get { return false; }
        }

        public void ProcessRequest(HttpContext context)
        {
            string result = "GET-Http-SKM: ParamA = " + context.Request.Params[0] + ", ParamB = " + context.Request.Params[1];
            context.Response.Write(result);
        }
    }
}
