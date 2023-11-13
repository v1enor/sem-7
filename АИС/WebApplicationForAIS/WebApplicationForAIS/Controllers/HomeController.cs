using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.DirectoryServices.ActiveDirectory;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplicationForAIS.Models;

namespace WebApplicationForAIS.Controllers
{
    public class HomeController : Controller


    {

        public ActionResult FullDesc()
        {
            //получаем список пользователей и их свойств
            //берем с помощью контекста 
            //список моделей для вывода на странице
            ViewBag.UserList = UserContext.UsersDebug();
            return View();
        }



        public ActionResult Index()
        {
            try
            {
                //получаем текущий домен
                DirectoryEntry domain = new DirectoryEntry();
                //получаем различающееся имя домена
                string fullDomainName = domain.
                    Properties["distinguishedName"].
                    Value.ToString();
                //убираем DC=, 
                //чтобы привести имя домена к привычной форме
                fullDomainName = fullDomainName.Replace("DC=", "");
                //заменяем запятые в иерархии доменов на привычные точки 
                fullDomainName = fullDomainName.Replace(",", ".");
                //передаем имя домена в представление
                ViewBag.Domain = fullDomainName;
                //передаем имя пользователя в представление
                ViewBag.Username = User.Identity.Name.Substring(
                    User.Identity.Name.IndexOf("\\") + 1
                    );
                //получаем список пользователей и их свойств
                //берем с помощью контекста 
                //список моделей для вывода на странице
                ViewBag.UserList = UserContext.Users();
            }
            catch (Exception eeeee)
            {
                ViewBag.Error =
                    eeeee.Message + " - " + eeeee.StackTrace;
            }
            return View();
        }


    }
}