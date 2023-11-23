using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.Linq;
using System.Web;

namespace WebApplicationForAIS.Models
{
    public class UserContext
    {
        public static List<UserModel> UsersDebug()
        {
            //получаем текущий домен
            DirectoryEntry domain = new DirectoryEntry();
            List<UserModel> UserList = new List<UserModel>();
            using (DirectorySearcher ds = new DirectorySearcher(domain))
            {
                using (SearchResultCollection results = ds.FindAll())
                {
                    if (results != null && results.Count > 0)
                    {
                        for (int i = 0; i < results.Count; i++)
                        {
                            //свойства текущего пользователя
                            ResultPropertyCollection res = results[i].Properties;
                            //заполняемая модель
                            UserModel u = new UserModel();

                            //перечень всех имеющихся свойств
                            u.FullDesc = "";
                            foreach (string e in res.PropertyNames)
                            {
                                u.FullDesc += e.ToString() + " = " +
                                    res[e.ToString()][0].ToString() +
                                    "; ----- ";
                            }
                            UserList.Add(u);
                        }
                    }
                }
            }
            domain.Close();
            return UserList;
        }

        public static List<UserModel> Users()
        {
            //получаем текущий домен
            DirectoryEntry domain = new DirectoryEntry();
            List<UserModel> UserList = new List<UserModel>();
            using (DirectorySearcher ds = new DirectorySearcher(domain))
            {
                ds.Filter = "(<название свойства>=<значение свойства после CN=>)";
                using (SearchResultCollection results = ds.FindAll())
                {
                    if (results != null && results.Count > 0)
                    {
                        for (int i = 0; i < results.Count; i++)
                        {
                            //свойства текущего пользователя
                            //значение каждого свойства - тоже коллекция, 
                            //но обычно в ней только нулевой элемент,
                            //многие свойства - необязательные, поэтому 
                            //перед обращением к ним нужно проверять их наличие
                            ResultPropertyCollection res = results[i].Properties;
                            //заполняемая модель
                            UserModel u = new UserModel();
                            u.Username = "";
                            //фамилия
                            if (res["sn"] != null && res["sn"].Count > 0)
                                u.Username += res["sn"][0].ToString() + " ";
                            //имя
                            if (res["givenname"] != null && res["givenname"].Count > 0)
                                u.Username += res["givenname"][0].ToString();
                            //логин
                            if (res["name"] != null && res["name"].Count > 0)
                                u.Login = res["name"][0].ToString();
                            //телефон
                            if (res["telephonenumber"] != null &&
                                res["telephonenumber"].Count > 0)
                                u.Phone = res["telephonenumber"][0].ToString();
                            //почта
                            if (res["mail"] != null && res["mail"].Count > 0)
                                u.Email = res["mail"][0].ToString();
                            //перечень всех имеющихся свойств
                            u.FullDesc = "";
                            foreach (string e in res.PropertyNames)
                            {
                                u.FullDesc += e.ToString() + " = " +
                                    res[e.ToString()][0].ToString() +
                                    "; ----- ";
                            }
                            UserList.Add(u);
                        }
                    }
                }
            }
            domain.Close();

            return UserList;
        }


    }


}