#pragma warning disable CA1050 // Declare types in namespaces
public class Person
#pragma warning restore CA1050 // Declare types in namespaces
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string? LastName { get; set; }
    public int?  Age { get; set; }
    public string? Address { get; set; }
    public string? Gender { get; set; }
    public string? MaritalStatus { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? Country { get; set; }
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public DateTime? DateOfBirth { get; set; }
}