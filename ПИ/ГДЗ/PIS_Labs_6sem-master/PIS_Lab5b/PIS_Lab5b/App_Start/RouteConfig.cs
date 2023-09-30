using System.Web.Mvc;
using System.Web.Routing;

namespace PIS_Lab5b
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapMvcAttributeRoutes();

            routes.MapRoute("Default", "{controller}/{action}", new { controller = "AResearch", action = "AA" });
            routes.MapRoute("MXX", "MResearch/MXX", new { controller = "MResearch", action = "MXX" });
        }
    }
}
