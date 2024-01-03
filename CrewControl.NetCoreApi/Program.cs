using Microsoft.EntityFrameworkCore;
using CrewControl.NetCoreApi.CrewDbContext;
using CrewControl.NetCoreApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Configure DbContext with SQL Server
builder.Services.AddDbContext<CDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("CrewControlDatabase"),
        sqlServerOptionsAction: sqlOptions =>
        {
            sqlOptions.EnableRetryOnFailure(
                maxRetryCount: 5, // Maximum number of retries
                maxRetryDelay: TimeSpan.FromSeconds(30), // Maximum delay between retries
                errorNumbersToAdd: null); // SQL error numbers to consider as transient
        }));

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.WithOrigins("http://localhost:4200") // Replace with your Angular app's URL
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});


// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<EmployeeService>();
// Add MVC Controller services
builder.Services.AddControllers(); // This line is added

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.UseHttpsRedirection();

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();  // This line is important for routing to controllers
});

app.Run();
