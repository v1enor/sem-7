using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using UWSR.Models;

namespace UWSR.Pages.Lnk
{
    public class IndexModel : PageModel
    {
        private readonly UWSR.Data.AppDbContext _context;

        public IndexModel(UWSR.Data.AppDbContext context)
        {
            _context = context;
        }

        public IList<Link> Link { get;set; } = default!;

        public async Task OnGetAsync()
        {
            if (_context.Links != null)
            {
                Link = await _context.Links.ToListAsync();
            }
        }
        
        public async Task<IActionResult> OnPostAsync(string handler, int id)
        {
            switch (handler)
            {
                case "OnPlus":
                    return await OnPlus(id);
                case "OnMinus":
                    return await OnMinus(id);
                case "Reset":
                    return Reset();
                case "Create":
                    return Create();
                case "Find":
                    return Find();
                default:
                    return RedirectToPage("./Index");
            }
        }

        public async Task<IActionResult> OnPlus(int id)
        {
            var linkDb = await _context.Links.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (linkDb == null)
            {
                return Page();
            }
            linkDb.Plus++;
            await _context.SaveChangesAsync();
            return RedirectToPage("./Index");
        }

        public async Task<IActionResult> OnMinus(int id)
        {
            var linkDb = await _context.Links.Where(x => x.Id == id).FirstOrDefaultAsync();
            if (linkDb == null)
            {
                return Page();
            }
            linkDb.Minus++;
            await _context.SaveChangesAsync();
            return RedirectToPage("./Index");
        }
        
        public IActionResult Reset()
        {
            HttpContext.Session.Remove("isAdmin");
            return RedirectToPage("./Index");
        }
        public IActionResult Create()
        {
            return RedirectToPage("./Create");
        }
        public IActionResult Find()
        {
            return RedirectToPage("./Find");
        }
    }
}
