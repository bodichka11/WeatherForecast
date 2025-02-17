using WeatherForecast.Models;

namespace WeatherForecast.Services.Interfaces
{
    public interface IWeatherService
    {
        Task<WeatherForecastModel> GetWeatherByPostalCode(string postalCode);
        Task<WeatherForecastModel> GetWeatherByCity(string city);
        Task<WeatherForecastModel> GetWeatherByCoordinates(double lat, double lon);
    }
}
