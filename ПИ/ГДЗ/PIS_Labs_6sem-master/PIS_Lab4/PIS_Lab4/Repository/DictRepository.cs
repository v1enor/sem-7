using System.Collections.Generic;
using System.Linq;
using PIS_Lab4.Context;
using PIS_Lab4.Models;

namespace PIS_Lab4.Repository
{
    public class DictRepository
    {
        private ApplicationDbContext context;

        public DictRepository() => context = new ApplicationDbContext();


        public List<PhoneBook> GetPhoneBooks()
        {
            //try
            //{
                return context.PhoneBooks.ToList();
            //}
            //catch { return new List<PhoneBook>(); }
        }


        public bool AddPhoneBook(PhoneBook phoneBook)
        {
            try
            {
                phoneBook.Id = GetFirstFreeId();
                context.PhoneBooks.Add(phoneBook);
                context.SaveChanges();
                return true;
            }
            catch { return false; }
        }


        public bool UpdatePhoneBook(PhoneBook phoneBook)
        {
            try
            {
                var bookFromDb = GetPhoneBooks().Find(x => x.Surname == phoneBook.Surname);
                context.PhoneBooks.Remove(bookFromDb);
                phoneBook.Id = bookFromDb.Id;
                context.PhoneBooks.Add(phoneBook);
                context.SaveChanges();
                return true;
            }
            catch { return false; }
        }


        public bool DeletePhoneBook(PhoneBook phoneBook) 
        {
            try
            {
                var bookFromDb = GetPhoneBooks().Find(x => x.Id == phoneBook.Id);
                context.PhoneBooks.Remove(bookFromDb);
                context.SaveChanges();
                return true;
            }
            catch { return false; }
        }



        // My alghorithm for correct new IDs for phonebooks
        private int GetFirstFreeId()
        {
            var ids = GetPhoneBooks().Select(x => x.Id).ToList();
            var firstFreeId = 0;
            for (int i = 1; i <= ids.Max(); i++)
            {
                firstFreeId = i;
                if (!ids.Contains(firstFreeId))
                    return firstFreeId;
            }
            return firstFreeId + 1;
        }
    }
}