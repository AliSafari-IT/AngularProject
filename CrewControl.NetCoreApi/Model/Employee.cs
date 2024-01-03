public class Employee
{
    public int EmployeeId { get; set; } // Primary key for Employee
    public int PersonId { get; set; }   // Foreign key to Person

    // Navigation property to Person
    public Person Person { get; set; }

    public string Department { get; set; }
    public DateTime DateOfJoining { get; set; }

    // ... other properties specific to Employee ...
}
