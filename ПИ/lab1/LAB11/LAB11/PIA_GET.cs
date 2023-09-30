using System.Web;
namespace LAB11
{
    public class PIA_GET : IHttpHandler
    {
        public bool IsReusable
        {
            get { return false; }
        }

        public void ProcessRequest(HttpContext context)
        {
            string result = "GET-Http-SKM: ParamA = " + context.Request.Params[0] + "\n ParamB = " + context.Request.Params[1];
            context.Response.Write(result);
        }
    }
}