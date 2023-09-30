using System;
using System.Web;

namespace lab01
{
    public class IISHandler1 : IHttpHandler
    {
       public bool IsReusable
        {
            get { return true; }
        }
        public void ProcessRequest(HttpContext context)
        {
            HttpResponse res = context.Response;
            res.Write("IISHandler1");
        }
    }
}
