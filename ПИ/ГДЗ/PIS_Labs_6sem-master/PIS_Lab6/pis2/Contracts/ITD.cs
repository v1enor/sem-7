using pis2.Models;
using System.Collections.Generic;


namespace pis2.Contracts
{
    public interface ITD
    {
        IEnumerable<Phone> GetAll();

        Phone Get(int id);

        void Add(string phoneNumber, string ownerName);

        void Delete(int id);

        void Update(Phone phone);
    }
}
