using System.Data.Entity;
using PIS_Lab4.Models;


namespace PIS_Lab4.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext() : base("PhoneBookConnection") { }
        public DbSet<PhoneBook> PhoneBooks { get; set; }
    }
}