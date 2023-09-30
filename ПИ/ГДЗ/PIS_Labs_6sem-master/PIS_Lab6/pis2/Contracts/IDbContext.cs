using pis2.Models;
using System.Data.Entity;

namespace pis2.Contracts
{
    public interface IDbContext
    {
        DbSet<Phone> Phone { get; set; }

        void SaveChanges();
    }
}
