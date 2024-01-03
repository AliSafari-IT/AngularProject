using Microsoft.EntityFrameworkCore;
// Given that Employee is a subclass of Person, and assuming you're using TPH (Table-Per-Hierarchy),
// your CDbContext class would typically look like this:
namespace CrewControl.NetCoreApi.CrewDbContext
{
    public class CDbContext : DbContext
    {
        public CDbContext(DbContextOptions<CDbContext> options) : base(options)
        {
        }

        public DbSet<Person> Persons { get; set; }
        public DbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // If needed, define the relationship between Person and Employee
            // For example, if it's a one-to-one relationship:
            modelBuilder.Entity<Employee>()
                .HasOne(e => e.Person)
                .WithOne()
                .HasForeignKey<Employee>(e => e.PersonId);

            // ... other model configurations ...
        }
    }
}
