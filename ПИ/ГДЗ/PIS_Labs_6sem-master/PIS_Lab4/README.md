Enable-Migrations -ContextTypeName ApplicationDbContext -MigrationsDirectory Migrations\PhoneBooks

add-migration -ConfigurationTypeName PIS_Lab4.Migrations.PhoneBooks.Configuration "Initial Migration"

update-database -ConfigurationTypeName PIS_Lab4.Migrations.PhoneBooks.Configuration -Verbose