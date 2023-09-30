using Ninject.Modules;
using Ninject;
using System.Web.Mvc;
using System.Web.Routing;
using Ninject.Web.Mvc;


namespace pis2
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            // unity container
            // Bootstrapper.Initialise();

            // ninject container
            NinjectModule registrations = new NinjectRegistrations();
            var kernel = new StandardKernel(registrations);
            DependencyResolver.SetResolver(new NinjectDependencyResolver(kernel));
        }
    }
}
