using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PIS_Lab4.Models
{
    public class PhoneBook
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Surname is required.")]
        public string Surname { get; set; }

        [Phone]
        [Required(ErrorMessage = "Phone Number is required.")]
        public string PhoneNumber { get; set; }
    }
}