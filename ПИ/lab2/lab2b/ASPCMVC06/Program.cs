namespace ASPCMVC06
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllersWithViews();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
            }
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();


            app.MapControllerRoute(
                name: "M01",
                pattern: "/MResearch/M01/1",
                defaults: new { controller = "TMResearch", action = "M01" });

            app.MapControllerRoute(
                name: "M01",
                pattern: "/MResearch/M01",
                defaults: new { controller = "TMResearch", action = "M01" });

            app.MapControllerRoute(
                name: "M01",
                pattern: "/MResearch",
                defaults: new { controller = "TMResearch", action = "M01" });

            app.MapControllerRoute(
                name: "M01",
                pattern: "/",
                defaults: new { controller = "TMResearch", action = "M01" });

            app.MapControllerRoute(
                name: "M01",
                pattern: "V2/MResearch/M01",
                defaults: new { controller = "TMResearch", action = "M01" });

            app.MapControllerRoute(
                name: "M01",
                pattern: "V3/MResearch/{string}/M01",
                defaults: new { controller = "TMResearch", action = "M01" });

            app.MapControllerRoute(
                name: "M02",
                pattern: "/V2",
                defaults: new { controller = "TMResearch", action = "M02" });

            app.MapControllerRoute(
                name: "M02",
                pattern: "V2/MResearch",
                defaults: new { controller = "TMResearch", action = "M02" });

            app.MapControllerRoute(
                name: "M02",
                pattern: "V2/MResearch/M02",
                defaults: new { controller = "TMResearch", action = "M02" });

            app.MapControllerRoute(
                name: "M02",
                pattern: "/MResearch/M02",
                defaults: new { controller = "TMResearch", action = "M02" });

            app.MapControllerRoute(
               name: "M02",
               pattern: "V3/MResearch/{string}/M02",
               defaults: new { controller = "TMResearch", action = "M02" });

            app.MapControllerRoute(
               name: "M03",
               pattern: "/V3",
               defaults: new { controller = "TMResearch", action = "M03" });

            app.MapControllerRoute(
             name: "M03",
             pattern: "V3/MResearch/{string}/",
             defaults: new { controller = "TMResearch", action = "M03" });

            app.MapControllerRoute(
             name: "M03",
             pattern: "V3/MResearch/{string}/M03",
             defaults: new { controller = "TMResearch", action = "M03" });

            app.MapControllerRoute(
             name: "MXX",
             pattern: "{*uri}",
             defaults: new { controller = "TMResearch", action = "MXX" });







            app.Run();
        }
    }
}