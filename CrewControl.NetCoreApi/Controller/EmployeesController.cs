using CrewControl.NetCoreApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CrewControl.NetCoreApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeService _employeeService;

        public EmployeesController(EmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee(int personId, string department, DateTime dateOfJoining)
        {
            await _employeeService.AddEmployeeAsync(personId, department, dateOfJoining);
            return Ok(); // Or return CreatedAtAction if you want to return the created employee data
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _employeeService.GetEmployeeByIdAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            return employee;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, Employee employee)
        {
            if (id != employee.EmployeeId)
            {
                return BadRequest();
            }
            try
            {
                await _employeeService.UpdateEmployeeAsync(employee);
                return NoContent();
            }
            catch (Exception ex)
            {
                // Handle the exception (e.g., log it, return an error message)
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _employeeService.GetEmployeeByIdAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            await _employeeService.DeleteEmployeeAsync(id);
            return NoContent();
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Employee>>> SearchEmployees(string searchTerm)
        {
            var employees = await _employeeService.SearchEmployeesAsync(searchTerm);
            return Ok(employees);
        }

        //[HttpPost]
        //public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var createdEmployee = await _employeeService.AddEmployeeAsync(employee);
        //    return CreatedAtAction("GetEmployee", new { id = createdEmployee.EmployeeId }, createdEmployee);
        //}


    }
}
