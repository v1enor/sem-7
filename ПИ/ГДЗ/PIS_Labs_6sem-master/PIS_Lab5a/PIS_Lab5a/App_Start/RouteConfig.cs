using System.Web.Mvc;
using System.Web.Routing;

namespace PIS_Lab5a
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapMvcAttributeRoutes();


            routes.MapRoute(
                name: "CResearch",
                url: "CResearch",
                defaults: new { controller = "CResearch", action = "C01" });

            routes.MapRoute(
                name: "V3/Controller/X/Action",
                url: "V3/{controller}/{x}/{action}",
                defaults: new { controller = "MResearch", action = "M03", x = UrlParameter.Optional });

            routes.MapRoute(
                name: "V2/Controller/Action",
                url: "V2/{controller}/{action}",
                defaults: new { controller = "MResearch", action = "M02" },
                constraints: new { action = "(?!M03).*" });

            routes.MapRoute(
                name: "Controller/Action/Id",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "MResearch", action = "M01", id = UrlParameter.Optional },
                constraints: new { action = "(?!M03).*" });


            routes.MapRoute(
                name: "MXX", 
                url: "MResearch/MXX",
                defaults: new { controller = "MResearch", action = "MXX" });
        }
    }
}
