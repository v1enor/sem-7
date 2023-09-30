using System;
using PIS_Lab4.Context;
using PIS_Lab4.Repository;

namespace PIS_Lab4.UnitOfWorkPattern
{
    public class UnitOfWork : IDisposable
    {
        private ApplicationDbContext context;
        private DictRepository dictRepo;
        private bool disposed = false;


        public DictRepository DictRepository 
        { 
            get 
            {
                if (dictRepo == null)
                    dictRepo = new DictRepository();
                return dictRepo;
            } 
        }

        public void Save() => context.SaveChanges();

        public virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                    context.Dispose();
                disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}