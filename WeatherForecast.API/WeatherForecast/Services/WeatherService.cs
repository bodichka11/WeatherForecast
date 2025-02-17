using System.Globalization;
using WeatherForecast.Models;
using WeatherForecast.Services.Interfaces;

namespace WeatherForecast.Services
{
    public class WeatherService : IWeatherService
    {
        private readonly HttpClient _httpClient;
        private readonly IGeocodingService _geocodingService;

        public WeatherService(HttpClient httpClient, IGeocodingService geocodingService)
        {
            _httpClient = httpClient;
            _geocodingService = geocodingService;
        }

        public async Task<WeatherForecastModel> GetWeatherByPostalCode(string postalCode)
        {
            var coords = await _geocodingService.GetCoordinatesByPostalCode(postalCode);
            return await GetWeatherForecast(coords.Latitude, coords.Longitude);
        }

        public async Task<WeatherForecastModel> GetWeatherByCity(string city)
        {
            var coords = await _geocodingService.GetCoordinatesByCity(city);
            return await GetWeatherForecast(coords.Latitude, coords.Longitude);
        }

        public async Task<WeatherForecastModel> GetWeatherByCoordinates(double lat, double lon)
        {
            return await GetWeatherForecast(lat, lon);
        }

        private async Task<WeatherForecastModel> GetWeatherForecast(double lat, double lon)
        {
            var response = await _httpClient.GetFromJsonAsync<OpenMeteoResponse>(
                $"https://api.open-meteo.com/v1/forecast?latitude={lat.ToString(CultureInfo.InvariantCulture)}&longitude={lon.ToString(CultureInfo.InvariantCulture)}&current_weather=true");

            return new WeatherForecastModel
            {
                Temperature = response.CurrentWeathers.Temperature,
                Windspeed = response.CurrentWeathers.Windspeed,
                WeatherCode = response.CurrentWeathers.WeatherCode,
                Time = response.CurrentWeathers.Time
            };
        }
    }
}
