using CrewControl.NetCoreApi.CrewDbContext;
using Microsoft.EntityFrameworkCore;

namespace CrewControl.NetCoreApi.Services
{
    public class EmployeeService
    {
        private readonly CDbContext _context;

        public EmployeeService(CDbContext context)
        {
            _context = context;
        }
        public async Task<List<Employee>> GetAllEmployeesAsync()
        {
            return await _context.Employees.ToListAsync();
        }


        // Create (Add) an Employee
        public async Task<Employee> AddNewEmployeeAsync(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        // Read (Get) an Employee by ID
        public async Task<Employee> GetEmployeeByIdAsync(int id)
        {
            return await _context.Employees.FindAsync(id);
        }

        // Update an Employee
        public async Task<Employee> UpdateEmployeeAsync(Employee employee)
        {
            _context.Employees.Update(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        // Delete an Employee
        public async Task DeleteEmployeeAsync(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee != null)
            {
                _context.Employees.Remove(employee);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<Employee>> SearchEmployeesAsync(string searchTerm)
        {
            // Assuming searchTerm is used to search in, say, names and departments
            return await _context.Employees
                                 .Where(e => e.Person.FirstName.Contains(searchTerm)
                                          || e.Person.LastName.Contains(searchTerm)
                                          || e.Department.Contains(searchTerm))
                                 .ToListAsync();
        }

        public async Task AddEmployeeAsync(int personId, string department, DateTime dateOfJoining)
        {
            var employee = new Employee
            {
                PersonId = personId,
                Department = department,
                DateOfJoining = dateOfJoining
            };

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
        }
    }

}
