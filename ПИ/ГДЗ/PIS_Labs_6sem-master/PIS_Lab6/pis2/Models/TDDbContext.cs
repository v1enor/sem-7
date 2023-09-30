using pis2.Contracts;
using System.Data.Entity;


namespace pis2.Models
{
    public class TDDbContext : DbContext, IDbContext
    {
        public DbSet<Phone> Phone { get; set; }

        public TDDbContext() : base("name=MyConnectionString") { }

        void IDbContext.SaveChanges()
        {
            SaveChanges();
        }
    }
}