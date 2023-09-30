using System;
using System.Web;

namespace lab01
{
    public class SKM_PUT : IHttpHandler
    {
        public bool IsReusable
        {
            get { return true; }
        }

        public void ProcessRequest(HttpContext context)
        {
            string result = "Put-Http-SKM: ParamA = " + context.Request.Form.Get("ParamA") + ", ParamB = " + context.Request.Form.Get("ParamB");
            context.Response.Write(result);
        }
    }
}
