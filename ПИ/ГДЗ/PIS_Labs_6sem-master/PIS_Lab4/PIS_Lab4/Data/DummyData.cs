using System.Collections.Generic;
using PIS_Lab4.Models;

namespace PIS_Lab4.Data
{
    public class DummyData
    {
        public static List<PhoneBook> GetPhoneBooks()
        {
            return new List<PhoneBook>() 
            { 
                new PhoneBook() {Id = 1, Name = "Alexander", Surname = "Valdaitsevv", PhoneNumber = "+375445573501"},
                new PhoneBook() {Id = 2, Name = "Katherine", Surname = "Vrublevskayaa", PhoneNumber = "+375333827583"},
                new PhoneBook() {Id = 3, Name = "Vladislav", Surname = "Gud", PhoneNumber = "+375258365837"},
                new PhoneBook() {Id = 4, Name = "Anton", Surname = "Tkachev", PhoneNumber = "+375447564397"},
                new PhoneBook() {Id = 5, Name = "Anton", Surname = "Apalanyuk", PhoneNumber = "+375295473854"},
                new PhoneBook() {Id = 6, Name = "Anton", Surname = "Dimitriadi", PhoneNumber = "+375333857693"},
                new PhoneBook() {Id = 7, Name = "Eugene", Surname = "Drevoten", PhoneNumber = "+375447658432"}
            };
        }
    }
}