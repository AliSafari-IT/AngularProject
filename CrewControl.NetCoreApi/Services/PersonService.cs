using CrewControl.NetCoreApi.CrewDbContext;
using Microsoft.EntityFrameworkCore;

namespace CrewControl.NetCoreApi.Services
{
    public class PersonService
    {
        private readonly CDbContext _context;

        public PersonService(CDbContext context)
        {
            _context = context;
        }
        public async Task<List<Person>> GetAllPersonsAsync()
        {
            return await _context.Persons.ToListAsync();
        }


        // Create (Add) an Person
        public async Task<Person> AddPersonAsync(Person Person)
        {
            _context.Persons.Add(Person);
            await _context.SaveChangesAsync();
            return Person;
        }

        // Read (Get) an Person by ID
        public async Task<Person> GetPersonByIdAsync(int id)
        {
            return await _context.Persons.FindAsync(id);
        }


        // Update an Person
        public async Task<Person> UpdatePersonAsync(Person Person)
        {
            _context.Persons.Update(Person);
            await _context.SaveChangesAsync();
            return Person;
        }

        // Delete an Person
        public async Task DeletePersonAsync(int id)
        {
            var Person = await _context.Persons.FindAsync(id);
            if (Person != null)
            {
                _context.Persons.Remove(Person);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<Person>> SearchPersonsAsync(string searchTerm)
        {
            // Assuming searchTerm is used to search in, say, names and departments
            return await _context.Persons
                                 .Where(e => e.FirstName.Contains(searchTerm)
                                          || e.LastName.Contains(searchTerm)
                                          || e.Email.Contains(searchTerm)
                                          || e.Country.Contains(searchTerm)
                                          || e.Age.ToString().Contains(searchTerm)
                                          || e.City.Contains(searchTerm))
                                 .ToListAsync();
        }
             
    }

}
