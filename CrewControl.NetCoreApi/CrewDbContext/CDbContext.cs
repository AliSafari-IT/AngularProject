using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
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



    }
}
