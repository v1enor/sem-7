using pis2.Contracts;
using System.Collections.Generic;


namespace pis2.Models
{
    public class TD : ITD
    {
        public void Add(string phoneNumber, string ownerName)
        {
            JsonHelper.AppendToEnd(phoneNumber, ownerName);
        }


        public void Delete(int id)
        {
            JsonHelper.Delete(id);
        }


        public Phone Get(int id)
        {
            return JsonHelper.GetById(id);
        }


        public IEnumerable<Phone> GetAll()
        {
            return JsonHelper.LoadFromJson();
        }


        public void Update(Phone phone)
        {
            JsonHelper.Update(phone);
        }
    }
}