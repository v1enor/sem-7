using System;
using System.Web;

namespace LAB11
{
    public class PIA_POST : IHttpHandler
    {
        public void ProcessRequest(HttpContext context) 
        {
            string paramA = context.Request.Form["ParmA"];
            string paramB = context.Request.Form["ParmB"];
        
            context.Response.ContentType = "text/plain";
            context.Response.Write($"POST-Http-XYZ:ParmA = {paramA}, ParmB = {paramB}");
        }

        public bool IsReusable { get { return false; } }
    }
}