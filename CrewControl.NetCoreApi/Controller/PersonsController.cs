using CrewControl.NetCoreApi.CrewDbContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Threading.Tasks;

namespace CrewControl.NetCoreApi.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonsController(CDbContext context) : ControllerBase
    {
        private readonly CDbContext _context = context;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Person>>> Get()
        {
            return await _context.Persons.ToListAsync();
        }
    }
}
