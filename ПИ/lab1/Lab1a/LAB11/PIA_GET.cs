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

            string paramA = context.Request["ParamA"];
            string paramB = context.Request["ParamB"];

            string result = "GET-Http-PIA: ParamA = " + paramA + "\n ParamB = " + paramB;
            context.Response.Write(result);
        }
    }
}