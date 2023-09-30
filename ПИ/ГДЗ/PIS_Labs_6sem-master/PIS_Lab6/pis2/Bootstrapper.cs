using System.Web.Mvc;
using Microsoft.Practices.Unity;
using Ninject.Modules;
using pis2.Contracts;
using pis2.Models;
using Unity.Mvc3;


namespace pis2
{
    public class NinjectRegistrations : NinjectModule
    {
        public override void Load()
        {
            // использование бд mssql
            Bind<IDbContext>().To<TDDbContext>();


            // только один объект на весь жизненный цикл приложения
            // Bind<ITD>().To<TDDbPhone>().InSingletonScope();

            // создается для каждого потока
            //Bind<ITD>().To<TDDbPhone>().InThreadScope();

            // для каждого http-запроса
            // Bind<ITD>().To<TDDbPhone>().InRequestScope();

            // создание объекта каждый раз когда он запрошен из контейнера
            Bind<ITD>().To<TDDbPhone>().InTransientScope();


            // json
            // Bind<ITD>().To<TD>();
        }
    }


    public static class Bootstrapper
    {
        public static void Initialise()
        {
            var container = BuildUnityContainer();
            DependencyResolver.SetResolver(new UnityDependencyResolver(container));
        }


        private static IUnityContainer BuildUnityContainer()
        {
            var container = new UnityContainer();
            container.RegisterType<IDbContext, TDDbContext>();
            container.RegisterType<ITD, TDDbPhone>();

            // register all your components with the container here
            // it is NOT necessary to register your controllers
            
            // e.g. container.RegisterType<ITestService, TestService>();            

            return container;
        }
    }
}