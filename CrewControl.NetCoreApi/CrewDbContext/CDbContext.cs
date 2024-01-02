using Microsoft.EntityFrameworkCore;

namespace CrewControl.NetCoreApi.CrewDbContext
{
    public class CDbContext : DbContext
    {
        public CDbContext(DbContextOptions<CDbContext> options)
           : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Person> Persons { get; set; }
        // DbSet for other entities
    }

}
