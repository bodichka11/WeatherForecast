using System.ComponentModel.DataAnnotations;

namespace WeatherForecast.Models
{
    public class SearchHistory
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string SearchTerm { get; set; } = string.Empty;

        [Required]
        public string SearchType { get; set; } = string.Empty; // "postal", "city", or "coordinates"

        [Required]
        public DateTime SearchDate { get; set; } = DateTime.UtcNow;
    }
}
