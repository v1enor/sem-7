using System.Web;

namespace LAB11
{
    

public class MyHandler : IHttpHandler
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
}}