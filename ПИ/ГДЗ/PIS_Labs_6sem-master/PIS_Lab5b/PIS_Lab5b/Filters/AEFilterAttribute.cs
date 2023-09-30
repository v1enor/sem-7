using System;
using System.Web.Mvc;

namespace PIS_Lab5b.Filters
{
    public class AEFilterAttribute : FilterAttribute, IExceptionFilter
    {
        public void OnException(ExceptionContext exceptionContext)
        {
            exceptionContext.HttpContext.Response.Write("Exception: " + exceptionContext.Exception.Message);
            var vr = new ViewResult();
            vr.ViewName = "Error";
            exceptionContext.Result = vr;
            exceptionContext.ExceptionHandled = true;
        }
    }
}