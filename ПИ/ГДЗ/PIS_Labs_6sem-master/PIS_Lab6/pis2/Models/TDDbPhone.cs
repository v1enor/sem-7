using pis2.Contracts;
using System.Collections.Generic;
using System.Linq;


namespace pis2.Models
{
    public class TDDbPhone : ITD
    {
        private IDbContext _db;

        public TDDbPhone(IDbContext db)
        {
            _db = db;
        }     


        public void Add(string phoneNumber, string ownerName)
        {
            _db.Phone.Add(new Phone { PhoneNumber = phoneNumber, OwnerName = ownerName });
            _db.SaveChanges();
        }


        public void Delete(int id)
        {
            var phone = _db.Phone.FirstOrDefault(x => x.Id == id);
            if (phone == null)
                return;

            _db.Phone.Remove(phone);
            _db.SaveChanges();
        }


        public Phone Get(int id)
        {
            var phone = _db.Phone.FirstOrDefault(x => x.Id == id);
            return phone;
        }


        public IEnumerable<Phone> GetAll()
        {
            var data = _db.Phone.Select(x => x).ToList();
            return data;
        }


        public void Update(Phone phone)
        {
            var entity = _db.Phone.FirstOrDefault(x => x.Id == phone.Id);
            entity.OwnerName = phone.OwnerName ?? entity.OwnerName;
            entity.PhoneNumber = phone.PhoneNumber ?? entity.PhoneNumber;
            _db.SaveChanges();
        }
    }
}