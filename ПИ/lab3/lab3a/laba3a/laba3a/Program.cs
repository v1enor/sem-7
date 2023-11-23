var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
	app.UseExceptionHandler("/Home/Error");
	// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
	app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
		   name: "default",
		   pattern: "Calc/Sum",
		   defaults: new { controller = "Home", action = "Sum" });

app.MapControllerRoute(
		   name: "default",
		   pattern: "Calc/Sub",
		   defaults: new { controller = "Home", action = "Sub" });

app.MapControllerRoute(
		   name: "default",
		   pattern: "Calc/Div",
		   defaults: new { controller = "Home", action = "Div" });

app.MapControllerRoute(
		   name: "default",
		   pattern: "Calc/Mul",
		   defaults: new { controller = "Home", action = "Mul" });

app.MapControllerRoute(
	name: "default",
	pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
