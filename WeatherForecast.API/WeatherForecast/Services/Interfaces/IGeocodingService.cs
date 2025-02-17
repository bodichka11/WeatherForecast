using WeatherForecast.Models;

namespace WeatherForecast.Services.Interfaces
{
    public interface IGeocodingService
    {
        Task<Coordinates> GetCoordinatesByPostalCode(string postalCode);
        Task<Coordinates> GetCoordinatesByCity(string city);
    }
}
