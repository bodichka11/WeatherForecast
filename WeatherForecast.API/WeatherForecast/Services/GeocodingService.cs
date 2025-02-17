using WeatherForecast.Models;
using WeatherForecast.Services.Interfaces;

namespace WeatherForecast.Services
{
    public class GeocodingService : IGeocodingService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public GeocodingService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<Coordinates> GetCoordinatesByPostalCode(string postalCode)
        {
            var username = _configuration["Geonames:Username"];
            var requestUrl = $"http://api.geonames.org/postalCodeSearchJSON?postalcode={postalCode}&maxRows=1&username={username}";

            Console.WriteLine($"Requesting: {requestUrl}");

            var response = await _httpClient.GetFromJsonAsync<GeonamesResponse>(requestUrl);

            if (response?.PostalCodes == null || response.PostalCodes.Count == 0)
            {
                throw new Exception($"No coordinates found for postal code {postalCode}");
            }

            return new Coordinates
            {
                Latitude = response.PostalCodes[0].Lat,
                Longitude = response.PostalCodes[0].Lng
            };
        }

        public async Task<Coordinates> GetCoordinatesByCity(string city)
        {
            var username = _configuration["Geonames:Username"];

            var response = await _httpClient.GetFromJsonAsync<GeonamesResponse>(
                $"http://api.geonames.org/searchJSON?q={city}&maxRows=1&username={username}");

            if (response?.Geonames == null || response.Geonames.Count == 0)
            {
                throw new Exception($"No coordinates found for city {city}");
            }

            return new Coordinates
            {
                Latitude = response.Geonames[0].Lat,
                Longitude = response.Geonames[0].Lng
            };
        }
    }
}
