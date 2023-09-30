using System.Web.Mvc;

namespace PIS_Lab5b.Filters
{
    public class ARFilterAttribute : FilterAttribute, IResultFilter
    {
        public void OnResultExecuted(ResultExecutedContext filterContext)
        {
            filterContext.HttpContext.Response.Write("--AFTER--");
        }

        public void OnResultExecuting(ResultExecutingContext filterContext)
        {
            filterContext.HttpContext.Response.Write("--BEFORE--");
        }
    }
}